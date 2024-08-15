import catchAsync from "../Utils/catchAsync.js";
import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import HandleError from "../Utils/handleError.js";
import jwt from "jsonwebtoken";

export const register = catchAsync(async (req, res, next) => {
  const { password, ...others } = req?.body;
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g;
  if (!regex.test(password)) {
    return next(new HandleError("password invalid", 400));
  }
  const hashPassword = bcryptjs.hashSync(password, 10);
  const user = await User.create({ password: hashPassword, ...others });
  return res.status(201).json({
    success: true,
    message: "user created successfuly",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password = null } = req.body;
  if (!email || !password) {
    return next(
      new HandleError("please provide both username or email or password", 400)
    );
  }
  const user = await User.findOne({email});
  if (!user) {
    return next(new HandleError("user not found!", 401));
  }
  const isPasswordMatch = bcryptjs.compareSync(password, user?.password);
  if (!isPasswordMatch) {
    return next(new HandleError("invalid username or password or email", 401));
  }
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET
  );
  return res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        fullName: user.fullName,
      },
    },
    message: "login successfully",
  });
});
