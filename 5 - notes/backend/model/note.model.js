import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
  tags: {
    type: [String],
    default: [],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    required: [true, "userId is required"],
  },
});


const Note = mongoose.model("Note", noteSchema);
export default Note;
