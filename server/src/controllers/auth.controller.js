import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/cloudinary.js";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const checkUser = await User.find({ username, email });
  if (checkUser.length !== 0) {
    throw new ApiError(401, "Account Creation Failed", "User Already Exist");
  }
  const localAvatarPath = req.file?.path;
  if (!localAvatarPath) {
    throw new ApiError(401, "Avatar is not Uploaded");
  }
  const cloudinaryUrl = await uploadImage(localAvatarPath);

  if (!cloudinaryUrl) {
    throw new ApiError(401, "Avatar is not Uploaded to Cloudinary");
  }
  const data = {
    username,
    email,
    password: hashPassword,
    avatar: cloudinaryUrl,
  };
  const createUser = await User.create(data);

  res
    .status(201)
    .json(new ApiResponse(201, "User Created Successfully", createUser));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const checkUser = await User.findOne({ username });

  if (checkUser.length == 0) {
    throw new ApiError(401, "Login Email Failed", "Invalid Credentials");
  }
  const checkPassword = bcrypt.compareSync(password, checkUser.password);

  if (!checkPassword) {
    throw new ApiError(401, "Login Password Failed", "Invalid Credentials");
  }
  const age = 1000 * 60 * 60 * 24 * 7;

  const token = jwt.sign(
    {
      id: checkUser.id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: age }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: age,
    })
    .status(200)
    .json(new ApiResponse(200, "User Login Successfully", checkUser));
});

const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json(new ApiResponse(200, "User Logout Successfully"));
});

export { register, login, logout };
