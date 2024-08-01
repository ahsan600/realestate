import mongoose, { Schema } from "mongoose";
const postDetialSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    desc: { type: String, required: true },
    utilities: { type: String, required: true },
    pet: { type: Number, required: true },
    income: { type: Number, required: true },
    size: { type: String, required: true },
    school: {
      type: String,
      required: true,
    },
    bus: {
      type: String,
      required: true,
    },
    Restaurant: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const PostDetial = mongoose.model("PostDetial", postDetialSchema);
export { PostDetial };
