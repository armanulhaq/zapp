import express from "express";
import {
    getUserOrders,
    placeOrderByCOD,
    placeOrderStripe,
    stripeWebHooks,
} from "../controllers/orderController.js";
import authUser from "../middleware/authUser.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderByCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/stripe/webhook", stripeWebHooks);
orderRouter.get("/user", authUser, getUserOrders);

export default orderRouter;
