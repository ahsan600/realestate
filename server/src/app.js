import express from "express";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "http://localhost:5174",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "5Mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export { app };
