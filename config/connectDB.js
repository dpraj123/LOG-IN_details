import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  // console.log(DATABASE_URL);
  try {
    const DB_OPTIONS = {
      dbName: "LOG_IN",
    };
    await mongoose.connect(
      DATABASE_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      DB_OPTIONS
    );
    console.log("connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
