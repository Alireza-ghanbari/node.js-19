import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import Product from "../models/product.model.js";
import ApiFeatures from "../Utils/apiFeatures.js";

export const addProduct = catchAsync(async (req, res, next) => {
  const { id, isAdmin } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (!isAdmin)
    return next(new HandleError("you can't perform this action", 401));

  const newProduct = await Product.create({ ...req.body });
  res.status(201).json(newProduct);
});

export const getAllProduct = catchAsync(async (req, res, next) => {
  const queryString = {
    ...req.query,
    fields: req?.query?.fields
      ? req?.query?.fields + ",-password,-__v"
      : "-password,-__v",
  };
  const features = new ApiFeatures(Product, queryString)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const products = await features.query;
  return res.status(200).json({
    success: true,
    data: {
      products,
    },
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  return res.status(200).json({
    success: true,
    data: {
      product,
    },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { isAdmin } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (!isAdmin) {
    return next(new HandleError("you don't have permission", 401));
  }
  await Product.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "delete product successfully",
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { isAdmin } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (!isAdmin) return next(new HandleError("you don't have permission", 401));

  const productToUpdate = await Product.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );
  if(!productToUpdate) return next(new HandleError("product not found", 404))
  return res.status(200).json({
    success: true,
    data: {
      productToUpdate,
    },
    message: "update product successfully",
  });
});
