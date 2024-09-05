import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import Note from "../model/note.model.js";
import HandleError from "../Utils/handleError.js";

export const addNote = catchAsync(async (req, res, next) => {
  const { title, content, tags = [] } = req.body;
  const { id } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );

  const note = await Note.create({
    title,
    content,
    tags,
    userId: id,
  });

  res.status(201).json({
    success: true,
    message: "Note added successfully!",
    note,
  });
});

export const upateNote = catchAsync(async (req, res, next) => {
  const { title, content, tags = [] } = req.body;

  const { id: userId } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );

  let note = await Note.findById(userId);

  if (userId !== note.userId) {
    return next(new HandleError("you can only update your notes", 401));
  }

  if (!title || !content || !tags) {
    return next(new HandleError("No changes provided!", 400));
  }

  note.title = title;
  note.content = content;
  note.tags = tags;

  await note.save();

  res.status(200).json({
    success: true,
    message: "Note updated successfully!",
    note,
  });
});

export const getAllNotes = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );

  const notes = await Note.find({ userId: id }).sort({ isPinned: -1 });

  res.status(200).json({
    success: true,
    notes,
  });
});

export const deleteNote = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );

  const { noteId } = req.params;

  if (!noteId) {
    return next(new HandleError("note not found!", 404));
  }

  await Note.deleteOne({ userId: id, _id: noteId });

  res.status(200).json({
    success: true,
    message: "Note deleted successfully!",
  });
});

export const updatePinned = catchAsync(async (req, res, next) => {
  const { id: userId } = jwt.verify(
    req?.headers?.authorization?.split(" ")[1],
    process.env.JWT_SECRET
  );

  const { isPinned = false } = req.body;
  const { noteId } = req.params;

  const updateNote = await Note.findByIdAndUpdate(noteId, isPinned, {
    new: true,
  });

  res.status(200).json({
    success: true,
    note: updateNote,
    message: "Note pin/unPin successfully!",
  });
});
