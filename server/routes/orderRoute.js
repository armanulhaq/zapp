import express from "express";
import authUser from "../middleware/authUser.js";
import authSeller from "../middleware/authSeller.js";
import {
    getAllOrder,
    getUserOrders,
    placeOrderByCOD,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderByCOD);
orderRouter.get("/user", authUser, getUserOrders);
orderRouter.get("/seller", authSeller, getAllOrder);

export default orderRouter;
