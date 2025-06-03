import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body:", req.body);

    const userExist = await userModel.findOne({ email }).select("+password");

    if (!userExist) {
      return res.status(401).json({
        success: false,
        message: "user not found",
      });
    }

    const isMatch = bcrypt.compare(password, userExist.password);

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

    res.status(200);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // false for localhost development
        sameSite: "none", // or 'strict' for localhost
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        path: "/", // important for all routes
        // domain: "https://invy-j2ow.onrender.com/login",
      })
      .json({ success: true, message: "login successful" });
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

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
        // domain: "https://invy-j2ow.onrender.com/register",
      })
      .json({
        success: true,
        message: "user create successfully",
      });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error + " server error during registration",
    // });
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
