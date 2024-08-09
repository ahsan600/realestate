import { Post } from "../models/post.model.js";
import { PostDetial } from "../models/postDetail.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadImage } from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { postData, postDetail } = req.body;
  const userId = req.user;
  const localPostsPath = req.files;

  if (localPostsPath.length === 0) {
    throw new ApiError(401, "Post Images is Required");
  }

  const cloudinaryUrls = await Promise.all(
    localPostsPath.map(
      async (localPostPath) => await uploadImage(localPostPath.path)
    )
  );
  if (cloudinaryUrls.length === 0) {
    throw new ApiError(401, "Post Images is not Uploaded to Cloudinary");
  }

  const postDataInsert = await Post.create({
    ...postData,
    images: cloudinaryUrls,
    owner: userId,
  });
  console.log(postDataInsert, postDetail);
  const postDetailsInsert = await PostDetial.create({
    ...postDetail,
    postId: postDataInsert.id,
  });

  res.status(200).json(new ApiResponse(200, "Posts is Created Working"));
});

export { createPost };
