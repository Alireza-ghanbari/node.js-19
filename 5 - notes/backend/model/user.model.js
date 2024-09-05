import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already  taken"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
