import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const connection = await mongoose.connect('mongodb://127.0.0.1:27017/weddingcardwholesaler')
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
