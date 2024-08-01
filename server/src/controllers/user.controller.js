import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import { uploadImage } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
const updateUser = asyncHandler(async (req, res) => {
  const { id, password, avatar, ...userInfo } = req.body;
  console.log(req.user, id);
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

export { updateUser };
