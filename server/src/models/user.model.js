import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export { User };
