import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authSeller.js";

import {
    addProduct,
    changeStockStatus,
    productById,
    productList,
} from "../controllers/ProductController.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(["images"]), authSeller, addProduct);
productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.post("/stock", authSeller, changeStockStatus);

export default productRouter;
