import express from "express";
const router = express.Router();

import {
  createPost,
  deleteUserPost,
  getAllUserPosts,
  getPost,
  updateUserPost,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";

router
  .route("/create-post")
  .post(verifyJWT, upload.array("postData[images]"), createPost);
router.route("/get-post/:id").get(verifyJWT, getPost);
router.route("/get-posts/:userId").get(verifyJWT, getAllUserPosts);
router.route("/delete-post/:postId").delete(verifyJWT, deleteUserPost);
router
  .route("/update-post/:postId")
  .patch(verifyJWT, upload.array("postData[images]"), updateUserPost);

export default router;
