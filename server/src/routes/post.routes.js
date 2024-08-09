import express from "express";
const router = express.Router();

import { createPost } from "../controllers/post.controller.js";

router.route("/create-post").post(createPost);

export default router;
