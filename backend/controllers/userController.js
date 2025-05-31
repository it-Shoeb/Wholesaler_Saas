import userModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    console.log("user:", user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "users not created" });
    }

    res
      .status(200)
      .json({ success: true, message: "users Fetched", data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error from userController getUsers: ${error}`,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    const user = await userModel.findOne({ _id: id });
    console.log("user:", user);
    res
      .status(200)
      .json({ success: true, message: "user fetched", data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error from userController/getUser: ${error}`,
    });
  }
};

export const postUser = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("req.params:", req.params);
    const { username, email } = req.body;
    // return console.log("req.body:", req.body);

    const response = await userModel.findByIdAndUpdate(
      { _id: id },
      { username, email }
    );

    res
      .status(200)
      .json({ success: true, message: "user updated successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error from userController/postUser: ${error}`,
    });
  }
};
