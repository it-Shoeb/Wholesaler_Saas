import inventoryModel from "../models/inventoryModel.js";

export const createInventoryItem = async (req, res) => {
  try {
    const { itemCode, itemName, itemImage, itemPrice } = req.body;

    const inventoryItemExist = await inventoryModel.findOne({
      itemCode,
      itemName,
    });

    if (inventoryItemExist) {
      return res
        .status(409)
        .json({ success: false, message: "item already present" });
    }

    const createInventoryItem = await inventoryModel.create({
      itemCode,
      itemName,
      itemImage,
      itemPrice,
    });

    if (!createInventoryItem) {
      return res
        .status(500)
        .json({ success: false, message: "failed while creating" });
    }

    res.status(201).json({
      success: true,
      message: "item added successfully",
      data: createInventoryItem,
    });
  } catch (error) {
    console.log(err.stack);

    res.status(500).json({
      success: false,
      message: "server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getInventoryItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await inventoryModel.countDocuments(); // get all documents count

    const inventoryItems = await inventoryModel.find().skip(skip).limit(limit);
    if (!inventoryItems) {
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    }
    res.status(200).json({
      success: true,
      message: "items fetched",
      pagination: {
        total, // total number of items
        page, //   current page number
        limit, // items per page
        pages: Math.ceil(total / limit), //total number of pages
      },
      count: inventoryItems.length,
      data: inventoryItems,
    });
  } catch (error) {
    console.log(err.stack);

    res.status(500).json({
      success: false,
      message: "server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getInventoryItem = async (req, res) => {
  try {
    const _id = req.params.id;

    const inventoryItemExist = await inventoryModel.findById({ _id });

    if (!inventoryItemExist) {
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    }

    res.status(200).json({
      success: true,
      message: "request successfull getInventoryItem",
      data: inventoryItemExist,
    });
  } catch (error) {
    console.log(err.stack);

    res.status(500).json({
      success: false,
      message: "server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const _id = req.params.id;
    const { itemCode, itemName, itemImage, itemPrice } = req.body;
    const inventoryItemExist = await inventoryModel.findOne({ _id });
    if (!inventoryItemExist) {
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    }

    const updateInventoryItem = await inventoryModel.findByIdAndUpdate(
      { _id },
      { itemCode, itemName, itemImage, itemPrice },
      { new: true }
    );

    if (!updateInventoryItem) {
      return res.status(500).json({
        success: false,
        message: "due to error updateInventoryItem failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "request successfull updateInventoryItem",
      data: updateInventoryItem,
    });
  } catch (error) {
    console.log(err.stack);

    res.status(500).json({
      success: false,
      message: "server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const deleteInventoryItem = async (req, res) => {
  try {
    const _id = req.params.id;
    const inventoryItemExist = await inventoryModel.findOne({ _id });

    if (!inventoryItemExist) {
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    }

    const deleteInventoryItem = await inventoryModel.findByIdAndDelete({ _id });

    if (!deleteInventoryItem) {
      return res.status(500).json({
        success: false,
        message: "due to error deleteInventoryItem failed",
      });
    }

    res.status(200).json({
      success: true,
      message: "request successfull deleteInventoryItem",
      data: deleteInventoryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
