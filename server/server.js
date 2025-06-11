import "dotenv/config"; //It loads environment variables from a .env
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

const allowedOrigins = [
    "http://localhost:5173",
    "https://zapp-lime.vercel.app",
];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebHooks); //it's used to handle payment events from Stripe (like successful payments, failed payments,
//express.raw() ensures the request body is received as raw data (required for Stripe webhooks), stripeWebHooks is the function that processes the webhook events

//Middleware configuration
app.use(express.json());
//express.json(): This is built-in middleware in Express that parses JSON request bodies and makes the data available on req.body.

app.use(cookieParser()); //It adds middleware to parse cookies from incoming requests, making them available in req.cookies.

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, //Without this, your frontend can't send things like login tokens or session cookies to your backend
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //Specifies which HTTP methods are allowed
        allowedHeaders: ["Content-Type", "Authorization"], //Defines which headers can be used in requests
    })
);

app.get("/", (req, res) => {
    res.send("Our server is running...");
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
