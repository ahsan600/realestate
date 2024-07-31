import express from "express";
const router = express.Router();

import { login, logout, register } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").get(verifyJWT, logout);
router.route("/test").get(verifyJWT);

export default router;
