import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const postProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      size,
      category,
      price,
      available_stock,
      status,
      images,
      video_demo_url,
    } = req.body;

    // console.log(req.user);
    console.log(req.body);
    // console.log(req.file);

    const productExist = await productModel.findOne({ title });

    if (productExist) {
      return res
        .status(409)
        .json({ success: false, message: "product already added" });
    }

    const addItem = await productModel.create({
      user_id: req.user._id,
      title,
      description,
      size,
      category,
      price,
      available_stock,
      status,
      images: req.file,
      // images: `uploads/products/${req.file.filename}`,
      video_demo_url,
    });

    const updateUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { products_ids: addItem._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "product added Successful",
      data: { addItem, updateUser },
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productModel
      .find()
      .limit(req.query.limit * 1)
      .skip((req.query.page - 1) * req.query.limit);

    // console.log(req.query.limit * 1, (req.query.page - 1) * req.query.limit);

    const total = await productModel.countDocuments();

    if (!product.length) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: total,
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

export const getAProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await productModel.findOne({ _id });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    res.status(200).json({
      success: true,
      message: "product fetch successful",
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

export const updateAProduct = async (req, res) => {
  try {
    const _id = req.params.id;

    const {
      user_id,
      title,
      description,
      size,
      category,
      price,
      available_stock,
      status,
      images,
      video_demo_url,
    } = req.body;

    const product = await productModel.findByIdAndUpdate(
      { _id },
      {
        user_id,
        title,
        description,
        size,
        category,
        price,
        available_stock,
        status,
        images: req.file,
        // images: `uploads/products/${req.file.filename}`,
        video_demo_url,
      }
      // { new: true }
    );

    res.status(200).json({
      success: true,
      message: "product update successful",
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

export const deleteAProduct = async (req, res) => {
  try {
    const _id = req.params.id;

    const productId = await productModel.findOne({
      _id,
    });

    if (!productId) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    await productModel.findByIdAndDelete({ _id });

    await userModel.findByIdAndUpdate(
      { _id: productId.user_id },
      { $pull: { products_ids: _id } }
    );

    res
      .status(200)
      .json({ success: true, message: "product deleted successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};
