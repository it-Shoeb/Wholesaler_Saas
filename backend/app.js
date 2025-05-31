import express from "express";
import connectDB from "./config/config_mongodb.js";
const app = express();
import { join } from "path";

import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import cors from "cors";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser()); // Must come after CORS
app.use(express.urlencoded({ extended: true }));
configDotenv();

app.use("/uploads", express.static(join(process.cwd(), "uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//show image to frontend

connectDB();

import authenticationRoute from "./routes/authenticationRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import invoiceRoute from "./routes/invoiceRoute.js";
import reportRoute from "./routes/reportRoute.js";
import customerRoute from "./routes/customerRoute.js";
import userRoute from "./routes/userRoute.js";

import authentication from "./middleware/authentication.js";
import checkRole from "./middleware/checkRole.js";

app.use("/authentication", authenticationRoute);
app.get("/authentication/check", authentication, (req, res) => {
  res.json({ success: true, message: "Authenticated", user: req.user });
});
app.use("/product", authentication, productRoute);
app.use("/order", authentication, orderRoute);
app.use("/customer", authentication, customerRoute);
app.use("/user", authentication, userRoute);
// app.use("/inventory", authentication, inventoryRoute);
// app.use("/invoice", authentication, invoiceRoute);
app.use("/report", authentication, reportRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
