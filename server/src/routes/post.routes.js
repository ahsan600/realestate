import express from "express";
const router = express.Router();

import {
  createPost,
  getAllUserPosts,
  getPost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

router
  .route("/create-post")
  .post(verifyJWT, upload.array("postData[images]"), createPost);
router.route("/get-post/:id").get(verifyJWT, getPost);
router.route("/get-posts/:userId").get(verifyJWT, getAllUserPosts);

export default router;
