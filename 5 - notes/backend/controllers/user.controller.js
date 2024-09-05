import catchAsync from "../Utils/catchAsync.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";

export const signUp = catchAsync(async (req, res, next) => {
  const { password, ...others } = req?.body;

  if (password?.length < 4) {
    return next(new HandleError("password is invalid", 400));
  }
  const hashPassword = bcryptjs.hashSync(password, 10);
  const user = await User.create({ password: hashPassword, ...others });
  return res.status(201).json({
    success: true,
    message: "User created successfully",
  });
});

export const signIn = catchAsync(async (req, res, next) => {
  const { email = null, password = null } = req.body;
  if (!email || !password) {
    return next(new HandleError("Please provide both email and password", 400));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("Invalid username or email or password", 401));
  }
  const isPasswordMatch = bcryptjs.compareSync(password, user?.password);
  if (!isPasswordMatch) {
    return next(new HandleError("Invalid username or email or password", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return res.status(200).json({
    success: true,
    token,
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
    message: "login successfully",
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );
  if (userId !== id) {
    return next(new HandleError("you don't have permission", 401));
  }
  const user = await User.findById(id);
  return res.status(200).json({
    success: true,
    user,
  });
});
