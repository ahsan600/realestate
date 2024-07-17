import express from "express";
const router = express.Router();

import { test } from "../controllers/post.controller.js";

router.route("/").get(test);

export default router;
