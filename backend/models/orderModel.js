import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  whatsappnumber: {
    type: String,
  },
  card: [
    {
      cardName: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      language: {
        type: String,
      },
      color: {
        type: String,
      },
      designImage: {
        type: String,
      },
    },
  ],
  specialCard: {
    type: String,
  },
  ProfingDate: {
    type: Date,
    default: new Date(Date.now() + 24 * 60 * 60 * 1000 * 2),
  },
  DeliveryDate: {
    type: Date,
    default: new Date(Date.now() + 24 * 60 * 60 * 1000 * 6),
  },
  OrderStatus: {
    type: String,
    enum: ["Order Placed", "Matter Profing", "Order Ready"],
    default: "Order Placed",
  },
  totalAmount: { type: Number },
  advanceAmount: { type: Number },
});

export default mongoose.model("order", orderSchema);