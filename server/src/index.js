import { app } from "./app.js";
import dotenv from "dotenv";
import { connection } from "./db/connection.js";

dotenv.config({
  path: "./.env",
});

const PORT = 1001;

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
