import mongoose from "mongoose";

const inventorySchema = mongoose.Schema([
  {
    itemCode: {
      type: String,
    },
  },
  {
    itemName: {
      type: String,
    },
  },
  {
    itemImage: {
      type: String,
    },
  },
  {
    itemPrice: {
      type: Number,
    },
  },
  {
    category: {
      type: String,
    },
  },
]);

export default mongoose.model("inventory", inventorySchema);
