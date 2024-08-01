import express from "express";
const router = express.Router();

import { updateUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
router
  .route("/update-user")
  .put(verifyJWT, upload.single("avatar"), updateUser);

export default router;
