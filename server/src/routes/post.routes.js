import express from "express";
const router = express.Router();

import { createPost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

router
  .route("/create-post")
  .post(verifyJWT, upload.array('postData[images]'), createPost);

export default router;
