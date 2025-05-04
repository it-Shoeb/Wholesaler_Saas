import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  [
    {
      username: {
        type: String,
      },
    },
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      password: {
        type: String,
        required: true,
        select: false,
      },
    },
    {
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
    },
    {
      products_ids: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      ],
    },
  ],
  { timestamps: true }
);

export default mongoose.model("user", userSchema);