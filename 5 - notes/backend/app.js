// packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
// utils
import catchError from "./utils/catchError.js";
import HandleError from "./Utils/handleError.js";
// routes
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/user", userRouter);

app.use("*", (req, res, next) => {
  return next(new HandleError("route not found!", 404));
});

app.use(catchError);

export default app;
