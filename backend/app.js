import e from "express";
import connectDB from "./config/config_mongodb.js";
const app = e();

import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import cookieParser from "cookie-parser";

app.use(cors());
app.use(e.json());
app.use(cookieParser());

connectDB();

import authenticationRoute from "./routes/authenticationRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import invoiceRoute from "./routes/invoiceRoute.js";
import reportRoute from "./routes/reportRoute.js";

import authentication from "./middleware/authentication.js";
import checkRole from "./middleware/checkRole.js";

app.use("/authentication", authenticationRoute);
app.use("/product", /*authentication,*/ productRoute);
app.use("/order", orderRoute);
app.use("/inventory", authentication, inventoryRoute);
app.use("/invoice", authentication, invoiceRoute);
app.use("/report", authentication, reportRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
