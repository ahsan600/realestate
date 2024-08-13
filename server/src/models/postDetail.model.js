import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const postDetialSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    desc: { type: String, required: true },
    utilities: { type: String, required: true },
    pet: { type: String, required: true },
    income: { type: String, required: true },
    size: { type: String, required: true },
    school: {
      type: String,
      required: true,
    },
    bus: {
      type: String,
      required: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
postDetialSchema.plugin(aggregatePaginate);
const PostDetial = mongoose.model("PostDetial", postDetialSchema);
export { PostDetial };
