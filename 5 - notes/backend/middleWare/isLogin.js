import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";

export const isLogin = catchAsync(async (req, res, next) => {
  try {
    const token = jwt.verify(
      req.headers?.authorization.split(" ")[1],
      process.env.JWT_SECRET
    );
    req.user = token;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }
});
