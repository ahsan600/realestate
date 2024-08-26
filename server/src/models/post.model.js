import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    images: [
      {
        type: String,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
    type: {
      type: String,
      enum: ["Buy", "Rent"],
    },
    property: {
      type: String,
      enum: ["Apartment", "House", "Condo", "Land"],
    },
  },
  { timestamps: true }
);
postSchema.plugin(aggregatePaginate);
const Post = mongoose.model("Post", postSchema);
export { Post };
