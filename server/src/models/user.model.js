import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      unique: [true, "Username must be unique"],
      required: [true, "Username is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneno: {
      type: String,
      required: [true, "Phone number is required"],
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
