import mongoose from "mongoose";


const connection = async () => {
  try {

    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database is Connected");
  } catch (error) {
    console.log(error);
  }
};
export { connection };
