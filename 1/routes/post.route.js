import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
