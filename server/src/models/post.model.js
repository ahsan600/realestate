import mongoose, { Schema } from "mongoose";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: { type: String, required: true },
    price: { type: String, required: true },
    bedroom: { type: String, required: true },
    bathroom: { type: String, required: true },
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
const Post = mongoose.model("Post", postSchema);
export { Post };
