import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import postRouter from "./routes/post.route.js";

const app = express();
dotenv.config();

const PORT = process.env.port || 8000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/posts/", postRouter);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
