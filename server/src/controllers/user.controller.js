import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { uploadImage } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
const updateUser = asyncHandler(async (req, res) => {
  const { id, password, avatar, ...userInfo } = req.body;
  if (req.user !== id) {
    return res.status(404).json(new ApiError(401, "Invaild Credinatal"));
  }

  let hashPassword;
  if (password.trim() !== "") {
    hashPassword = bcrypt.hashSync(password, 10);
  }
  const localPath = req.file?.path;
  let uploadImagetoCloudinary;
  if (localPath) {
    uploadImagetoCloudinary = await uploadImage(localPath);
    if (!uploadImagetoCloudinary) {
      return res.status(404).json(new ApiError(500, "Internal Server Error"));
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user,
    {
      username: userInfo.username,
      email: userInfo.email,
      phoneno: userInfo.phoneno,
      ...(password && { password: hashPassword }),
      ...(userInfo.avatar ? { avatar } : { avatar: uploadImagetoCloudinary }),
    },
    { new: true }
  );
  res.status(200).json(new ApiResponse(200, "User Info is Updated", user));
});
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id).select("-password -phoneno");
  if (!user) {
    return res
      .status(404)
      .json(new ApiError(404, "User Not Found", "User Not Found"));
  }
  res.status(200).json(new ApiResponse(200,"User Found",user))
});
export { updateUser, getSingleUser };
