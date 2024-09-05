import jwt from "jsonwebtoken";
import Note from "../models/note.model.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleError from "../Utils/handleError.js";

export const search = catchAsync(async (req, res) => {
  const { id } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );

  const { query } = req.query;

  if (!query) {
    return next(new HandleError("Search query is required", 400))
  }

  const matchingNotes = await Note.find({
    userId: id,
    $or: [
      { title: { $regex: new RegExp(query, "i") } },
      { content: { $regex: new RegExp(query, "i") } },
      { tags: { $regex: new RegExp(query, "i") } },
    ],
  });

  return res.json(matchingNotes);
});
