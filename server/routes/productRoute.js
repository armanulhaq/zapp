import express from "express";
import { upload } from "../configs/multer.js"; //handles file uploads, Makes them available in req.files Makes other form data available in req.body
import authSeller from "../middleware/authSeller.js";

import {
    addProduct,
    changeStockStatus,
    productById,
    productList,
} from "../controllers/ProductController.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array(["images"]), authSeller, addProduct); //Multer handle any files with field name "images",check if seller is authenticated, and then adds
productRouter.get("/list", productList);
productRouter.get("/id", productById);
productRouter.post("/stock", authSeller, changeStockStatus);

export default productRouter;

//When we get productInfo and images from FormData, Multer intercepts it and processes the uploaded images and makes them available in req.files and passes them to authSeller and addProduct controllere
