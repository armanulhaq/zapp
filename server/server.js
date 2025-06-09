import "dotenv/config";
import cookieParser from "cookie-parser"; //Lets you read cookies sent by the client
import express, { application } from "express";
import cors from "cors"; //Helps your backend allow requests from a different frontend (e.g., frontend on port 5173)
import connectDB from "./configs/db.js";

import userRoute from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebHooks } from "./controllers/orderController.js";

const app = express();

const port = process.env.PORT || 4000;

await connectDB();
const allowedOrigins = ["http://localhost:5173"];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebHooks);

//Middleware configuration
app.use(express.json()); //It tells your Express app to automatically parse any incoming request that has a Content-Type of application/json.
//express.json(): This is built-in middleware in Express that parses JSON request bodies and makes the data available on req.body.

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
    res.send("HIIIII");
});

app.use("/api/user", userRoute);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
