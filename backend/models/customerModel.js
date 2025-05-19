import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  customerNumber: {
    type: String,
  },
  customerImage: {
    type: Array,
  },
  order_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

export default mongoose.model("customer", customerSchema);
