import customerModel from "../models/customerModel.js";

export const postCustomer = async (req, res) => {
  try {
    const { customerName, customerEmail, customerNumber } = req.body;

    const customerExist = await customerModel.findOne({ customerNumber });

    if (customerExist) {
      return res
        .status(209)
        .json({ success: false, message: "customer conflict" });
    }

    const createCustomer = await customerModel.create({
      customerName,
      customerEmail,
      customerNumber,
      customerImage: req.file,
    });

    console.log("createCustomer:", createCustomer);

    res.status(200).json({
      success: true,
      message: "postCustomer successfully",
      data: createCustomer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();

    res.status(200).json({
      success: true,
      message: "getCustomers successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const currentCustomer = await customerModel.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "getCustomer successfully",
      data: currentCustomer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const putCustomer = async (req, res) => {
  const { customerName, customerEmail, customerNumber } = req.body;
  const { id } = req.params;

  const customerExist = await customerModel.findOne({ customerNumber });

  // if (customerExist) {
  //   return res
  //     .status(209)
  //     .json({ success: false, message: "Customer conflict" });
  // }

  try {
    const updateCustomer = await customerModel.findByIdAndUpdate(
      { _id: id },
      { customerName, customerEmail, customerNumber, customerImage: req.file }
    );
    console.log("file:", req.file);
    console.log("updateCustomer:", updateCustomer);

    res
      .status(200)
      .json({ success: true, message: "putCustomer successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await customerModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ success: true, message: "Customer deleteCustomer" });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
