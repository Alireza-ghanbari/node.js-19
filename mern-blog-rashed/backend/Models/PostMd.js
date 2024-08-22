import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    image: { type: String },
    description: { type: String, required: [true, "description is required"] },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "category id required"],
    },
    
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
