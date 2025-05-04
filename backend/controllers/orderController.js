import orderModel from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      whatsappnumber,
      card,
      specialCard,
      ProfingDate,
      DeliveryDate,
      OrderStatus,
    } = req.body;

    const existingOrder = await orderModel.findOne({
      customerEmail,
      whatsappnumber,
    });

    if (existingOrder) {
      return res.status(409).json({
        success: false,
        message: "An order already exists for this customer ",
      });
    }

    const newOrder = await orderModel.create({
      customerName,
      customerEmail,
      whatsappnumber,
      card: card.map((cardItem) => ({
        cardName: cardItem.cardName,
        quantity: cardItem.quantity,
        language: cardItem.language,
        color: cardItem.color,
        designImage: cardItem.designImage,
      })),
      specialCard,
      ProfingDate,
      DeliveryDate,
      OrderStatus,
    });

    if (!newOrder) {
      return res.status(400).json({
        success: false,
        message: "Failed to create order",
      });
    }

    res.status(201).json({
      success: true,
      message: "order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "No Order Found" });
    }

    res.status(200).json({
      success: true,
      message: "order fetch",
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const _id = req.params.id;

    const isOrderExist = await orderModel.findOne({ _id });

    if (!isOrderExist) {
      return res
        .status(409)
        .json({ success: false, message: "Order Not Exist" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order Fetched", data: isOrderExist });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const _id = req.params.id;
    const {
      customerName,
      customerEmail,
      whatsappnumber,
      card,
      specialCard,
      ProfingDate,
      DeliveryDate,
      OrderStatus,
    } = req.body;

    const orderExist = await orderModel.findOne({ _id });

    if (!orderExist) {
      return res
        .status(409)
        .json({ success: false, message: "order not found" });
    }

    const updateOrder = await orderModel.findByIdAndUpdate(
      { _id },
      {
        customerName,
        customerEmail,
        whatsappnumber,
        card: card.map((cardItem) => ({
          cardName: cardItem.cardName,
          quantity: cardItem.quantity,
          language: cardItem.language,
          color: cardItem.color,
          designImage: cardItem.designImage,
        })),
        specialCard,
        ProfingDate,
        DeliveryDate,
        OrderStatus,
      }
    );

    if (!updateOrder) {
      return res.status(202).json({ success: false, message: "update failed" });
    }

    res.status(200).json({
      success: true,
      message: "order update successful",
      data: updateOrder,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error`,
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const _id = req.params.id;

    const isOrderExist = await orderModel.findOne({ _id });

    if (!isOrderExist) {
      return res
        .status(400)
        .json({ success: false, message: "Order is not Exist" });
    }

    await orderModel.findByIdAndDelete({ _id });

    res.status(200).json({ success: true, message: "Order Deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error`,
      error: error.message,
    });
  }
};
