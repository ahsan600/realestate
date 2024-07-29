import express from "express";
const router = express.Router();

import { login, logout, register } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.js";

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
