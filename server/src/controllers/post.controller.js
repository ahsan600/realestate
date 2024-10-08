import mongoose from "mongoose";
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

  await PostDetial.create({
    ...postDetail,
    postId: postDataInsert.id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Posts is Created Working", postDataInsert._id));
});
const getAllUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const getUserPosts = await Post.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);
  if (!getUserPosts) {
    return res.status(401).json(new ApiError(401, "", "Posts Not Found"));
  }
  res.status(200).json(new ApiResponse(200, "SinglePost", getUserPosts));
});
const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [getSinglePost] = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "postdetials",
        localField: "_id",
        foreignField: "postId",
        as: "SinglePostData",
      },
    },
    {
      $addFields: {
        SinglePostData: { $arrayElemAt: ["$SinglePostData", 0] },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$SinglePostData"],
        },
      },
    },
    {
      $addFields: {
        id: "$postId",
      },
    },
    {
      $project: {
        SinglePostData: 0,
        _id: 0,
        postId: 0,
      },
    },
  ]);
  if (!getSinglePost) {
    return res.status(401).json(new ApiError(401, "", "Post Not Found"));
  }
  res.status(200).json(new ApiResponse(200, "SinglePost", getSinglePost));
});
const deleteUserPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(401).json(new ApiError(401, "", "Post Not Found"));
  }
  await Post.findByIdAndDelete(postId);
  await PostDetial.deleteOne({ postId });
  res.status(200).json(new ApiResponse(200, "Post is Delete", deleteUserPost));
});
const updateUserPost = asyncHandler(async (req, res) => {
  const { postData, postDetail } = req.body;
  const { postId } = req.params;

  try {
    let cloudinaryUrls = [];

    if (req.files?.length > 0) {
      const localPostsPath = req.files;

      cloudinaryUrls = await Promise.all(
        localPostsPath.map((localPostPath) => uploadImage(localPostPath.path))
      );

      if (cloudinaryUrls.length === 0) {
        throw new ApiError(401, "Post Images were not uploaded to Cloudinary");
      }
    }
    if (Array.isArray(postData.images)) {
      cloudinaryUrls = [...postData.images, ...cloudinaryUrls];
    } else if (postData.images) {
      cloudinaryUrls = [postData.images, ...cloudinaryUrls];
    }
    await Post.findByIdAndUpdate(postId, {
      ...postData,
      ...(cloudinaryUrls.length > 0 && { images: cloudinaryUrls }),
    });

    await PostDetial.findOneAndUpdate({ postId }, { ...postDetail });

    res
      .status(200)
      .json(new ApiResponse(200, "Post updated successfully", postId));
  } catch (error) {
    console.error("Error updating post:", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
const getAllPosts = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice, ...queryPost } = req.query;

  const query = {
    ...queryPost,
    price: {
      $gte: JSON.parse(req.query.minPrice),
      $lte: JSON.parse(req.query.maxPrice),
    },
  };
  console.log(queryPost);
  const posts = await Post.find(query);
  res.status(200).json(new ApiResponse(200, "Posts fetch successfully", posts));
});
export {
  createPost,
  getAllPosts,
  getAllUserPosts,
  getPost,
  deleteUserPost,
  updateUserPost,
};
