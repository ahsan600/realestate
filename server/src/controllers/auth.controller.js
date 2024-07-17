import prisma from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const checkUser = await prisma.user.findUnique({
    where: {
      username,
      email,
    },
  });
  if (checkUser) {
    return res
      .status(401)
      .json(new ApiError(401, "Account Creation Failed", "User Already Exist"));
  }
  const createUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashPassword,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, "User Created Successfully", createUser));
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const checkUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!checkUser) {
    return res
      .status(401)
      .json(new ApiError(401, "Login Email Failed", "Invalid Credentials"));
  }
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  if (!checkPassword) {
    return res
      .status(401)
      .json(new ApiError(401, "Login Password Failed", "Invalid Credentials"));
  }
  const age = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign(
    {
      id: checkUser.id,
    },
    process.env.JWT_SECERT_KEY,
    { expiresIn: age }
  );
  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: age,
    })
    .status(200)
    .json(new ApiResponse(200, "User Login Successfully"));
});

const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json(new ApiResponse(200, "User Logout Successfully"));
});

export { register, login, logout };
