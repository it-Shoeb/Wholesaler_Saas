import invoiceModel from "../models/invoiceModel.js";

export const createInvoice = async (req, res) => {
  try {
    const _id = req.params.id;
    const {
      invoiceNumber,
      user_id,
      customer,
      item,
      totalAmount,
      advanceAmount,
      orderDate,
    } = req.body;

    const invoiceExist = await invoiceModel.findOne({ _id });

    if (!invoiceExist) {
      return res
        .status(404)
        .json({ success: false, message: "invoice not found" });
    }

    const invoice = await invoiceModel.create({
      invoiceNumber,
      user_id,
      customer,
      item: item.map((invoiceItem) => ({
        itemName: invoiceItem.itemName,
        itemPrice: invoiceItem.itemPrice,
        itemQuantity: invoiceItem.itemQuantity,
      })),
      totalAmount,
      advanceAmount,
      orderDate,
    });

    res.status(201).json({
      success: true,
      message: "User created successfull",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
export const getInvoices = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const total = await invoiceModel.countDocuments();

    const invoices = await invoiceModel.find().limit(limit).skip(skip);
    res.status(200).json({
      success: true,
      message: "invoices fetched",
      page: Math.ceil(total / limit),
      limit,
      total,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const _id = req.params.id;
    const invoiceExist = await invoiceModel.findOne({ _id });

    if (!invoiceExist) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "invoice fetched", data: invoiceExist });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const putInvoice = async (req, res) => {
  try {
    const _id = req.params.id;
    const {
      invoiceNumber,
      customer,
      item,
      totalAmount,
      advanceAmount,
      orderDate,
    } = req.body;

    const invoiceExist = await invoiceModel.findOne({ _id });
    if (!invoiceExist) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    const update = await invoiceModel.findByIdAndUpdate(
      { _id },
      {
        invoiceNumber,
        customer,
        item: item.map((invoiceItem) => ({
          itemName: invoiceItem.itemName,
          itemPrice: invoiceItem.itemPrice,
          itemQuantity: invoiceItem.itemQuantity,
        })),
        totalAmount,
        advanceAmount,
        orderDate,
      }
    );

    res
      .status(200)
      .json({ success: true, message: "invoice updated", data: update });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const _id = req.params.id;
    const invoiceExist = await invoiceModel.findOne({ _id });

    if (!invoiceExist) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    const deleteInvoice = await invoiceModel.findByIdAndDelete({ _id });

    res
      .status(200)
      .json({
        success: true,
        message: "invoice deleted successfull",
        data: deleteInvoice,
      });
      
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected Server Error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
