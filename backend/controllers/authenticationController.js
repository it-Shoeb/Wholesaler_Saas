import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ sucess: false, message: "invalid credentials" });
    }

    const token = jwt.sign(
      { email: userExist.email, _id: userExist._id, role: userExist },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({ success: true, message: "login succesful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error + " server error during login" });
  }
};

export const registerController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(409)
        .json({ success: false, message: "user already have an account" });
    }

    const genSalt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, genSalt);

    const createUser = await userModel.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES || "1h",
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({
        success: true,
        message: "user create successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error + " server error during registration",
    });
  }
};

export const logoutController = (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ success: true, message: "logout Successfull" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error + " server error during registration",
    });
  }
};

export default { loginController, registerController, logoutController };
