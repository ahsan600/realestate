import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const test = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, "User Working"));
});

export { test };
