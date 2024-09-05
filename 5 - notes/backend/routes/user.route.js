import express from "express";
import { getUser, signIn, signUp } from "../controllers/user.controller.js";
import { isLogin } from "../middleWare/isLogin.js";

const userRouter = express.Router();

userRouter.route("/sign-up").post(signUp);
userRouter.route("/sign-in").post(signIn);
userRouter.route("/:id").get(isLogin, getUser);

export default userRouter;
