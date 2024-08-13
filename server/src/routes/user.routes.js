import express from "express";
const router = express.Router();

import { getSingleUser, updateUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/verifyJWT.js";
router
  .route("/update-user")
  .put(verifyJWT, upload.single("avatar"), updateUser);
router.route("/get-user").post(verifyJWT, getSingleUser);

export default router;
