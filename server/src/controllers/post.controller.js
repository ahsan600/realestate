import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
  const { postData, postDetail } = req.body;
  console.log(postData, postDetail);
  res.status(200).json(new ApiResponse(200, "Posts Working"));
});

export { createPost };
