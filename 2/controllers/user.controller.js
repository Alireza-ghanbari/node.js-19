import catchAsync from "../Utils/catchAsync.js";
import User from "../models/user.model.js";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";
import ApiFeatures from "../Utils/apiFeatures.js";

export const getAllUser = catchAsync(async (req, res, next) => {
  const queryString = {
    ...req.query,
    fields: req?.query?.fields
      ? req?.query?.fields + ",-password,-__v"
      : "-password,-__v",
  };
  const features = new ApiFeatures(User, queryString)
    .filters()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const users = await features.query;
  return res.status(200).json({
    success: true,
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (userId !== id && role !== "admin") {
    return next(new HandleError("you don't have permission", 401));
  }
  const user = await User.findById(id);
  return res.status(200).json({
    success: true,
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (userId !== id && role !== "admin") {
    return next(new HandleError("you don't have permission", 401));
  }
  await User.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "delete account successfully",
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId, role } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (userId !== id && role !== "admin") {
    return next(new HandleError("you don't have permission", 401));
  }
  const { password = null, role: updateRole = null, ...others } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { ...others },
    { new: true, runValidators: true }
  );
  return res.status(200).json({
    success: true,
    data: {
      user,
    },
    message: "update account successfully",
  });
});
