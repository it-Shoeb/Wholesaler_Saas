import mongoose from "mongoose";

const inventorySchema = mongoose.Schema([
  {
    itemCode: {
      type: String,
    },
    itemName: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    itemPrice: {
      type: Number,
    },
    itemImage: {
      type: String,
    },
    currentStock: {
      type: Number,
    },
    minimumStock: {
      type: Number,
    },
  },
]);

export default mongoose.model("inventory", inventorySchema);
