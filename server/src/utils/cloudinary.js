import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECERT,
});

const uploadImage = async (localPath) => {
  try {
    const response = await cloudinary.uploader.upload(localPath);
    fs.unlinkSync(localPath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.log(error);
  }
};
export { uploadImage };
