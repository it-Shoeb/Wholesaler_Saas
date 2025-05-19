import customerModel from "../models/customerModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

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
      totalAmount,
      advanceAmount,
      customer_id,
    } = req.body;

    // const existingOrder = await orderModel.findOne({
    //   customerEmail,
    //   whatsappnumber,
    // });

    // if (existingOrder) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "An order already exists for this customer ",
    //   });
    // }

    const newOrder = await orderModel.create({
      customerName,
      customerEmail,
      whatsappnumber,
      card: card.map((cardItem) => ({
        cardName: cardItem.cardName,
        quantity: cardItem.quantity,
        language: cardItem.language,
        color: cardItem.color,
        cardImage: cardItem.cardImage,
        price: cardItem.price,
      })),
      specialCard,
      ProfingDate,
      DeliveryDate,
      OrderStatus,
      totalAmount,
      advanceAmount,
      customer_id: [customer_id],
    });

    const pushIdtoCustomer = await customerModel.findByIdAndUpdate(
      { _id: customer_id },
      { $push: { order_id: newOrder._id } }
    );

    const product = await productModel.findOne({
      title: newOrder.card[0].cardName,
    });

    const currentStock = product.available_stock;

    const pushIdtoProduct = await productModel.findByIdAndUpdate(
      { _id: product._id },
      {
        $push: {
          customer_ids: [customer_id],
        },
        available_stock: currentStock - newOrder.card[0].quantity,
      }
    );

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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const count = await orderModel.countDocuments();

    const orders = await orderModel
      .find()
      .limit(limit)
      .skip(skip)
      .populate("customer_id");

    if (!orders) {
      return res
        .status(400)
        .json({ success: false, message: "No Order Found" });
    }

    res.status(200).json({
      success: true,
      message: "order fetch",
      pagination: {
        count,
        page,
        limit,
        skip,
      },
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

    const isOrderExist = await orderModel
      .findOne({ _id })
      .populate("customer_id");

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
      totalAmount,
      advanceAmount,
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
          cardImage: cardItem.cardImage,
          price: cardItem.price,
        })),
        specialCard,
        ProfingDate,
        DeliveryDate,
        OrderStatus,
        totalAmount,
        advanceAmount,
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

    const user = await customerModel.findByIdAndUpdate(
      { _id: isOrderExist.customer_id[0] },
      { $pull: { order_id: _id } }
    );

    const product = await productModel.findOne({
      title: isOrderExist.card[0].cardName,
    });

    const currentStock = product.available_stock;

    const updateProduct = await productModel.findByIdAndUpdate(
      { _id: product._id },
      {
        $pull: { user_id: user._id },
        available_stock: isOrderExist.card[0].quantity + currentStock,
      }
    );

    console.log(updateProduct);

    res.status(200).json({ success: true, message: "Order Deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error`,
      error: error.message,
    });
  }
};
