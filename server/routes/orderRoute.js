import express from "express";
import {
    getUserOrders,
    placeOrderByCOD,
    placeOrderStripe,
    stripeWebHooks,
    getAllOrder,
} from "../controllers/orderController.js";
import authUser from "../middleware/authUser.js";
import authSeller from "../middleware/authSeller.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderByCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/stripe/webhook", stripeWebHooks);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrder);

export default orderRouter;
