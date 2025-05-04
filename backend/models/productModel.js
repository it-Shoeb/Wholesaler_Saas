import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
    {
      title: {
        type: String,
        unique: true,
        trim: true,
      },
    },
    {
      description: {
        type: String,
      },
    },
    {
      size: {
        type: String,
      },
    },
    {
      category: {
        type: String,
      },
    },
    {
      price: {
        type: Number,
      },
    },
    {
      available_stock: {
        type: Number,
        required: true,
      },
    },
    {
      status: {
        type: Boolean,
        required: true,
      },
    },
    {
      images: {
        type: Array,
        required: true,
      },
    },
    {
      video_demo_url: {
        type: String,
      },
    },
  ],
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
