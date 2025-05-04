import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    customer: {
      type: String,
    },
    item: [
      {
        itemName: {
          type: String,
        },
        itemPrice: {
          type: Number,
        },
        itemQuantity: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    advanceAmount: {
      type: Number,
    },
    orderDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("invoice", invoiceSchema);
