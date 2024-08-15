import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATA_BASE_URI)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
