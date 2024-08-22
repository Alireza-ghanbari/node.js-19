import express from "express";
import {
  createComment,
  deleteComment,
  getAllComment,
  getOneComment,
} from "../Controllers/CommentCn.js";
import { isLogin } from "../Middleware/isLogin.js";

const commentRouter = express.Router();
commentRouter.route("/").get(getAllComment).post(isLogin, createComment);
commentRouter.route("/:id").get(getOneComment).delete(isLogin, deleteComment);

export default commentRouter;
