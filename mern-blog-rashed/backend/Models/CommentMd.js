import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: [true, "content is required"] },
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post",required:[true,'Post id required'] },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
