import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.js";

//Add Product: api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData); //comes from user
        const images = req.files;
        let imagesURL = await Promise.all(
            //uploading product images to Cloudinary
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url();
            })
        );
        await Product.create({
            ...productData, // Spread all product details (name, price, etc)
            image: imagesURL, // Add the Cloudinary image URLs
        });
        res.json({ success: true, message: "Product successfully added." });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Get Product: api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({}); //get all data
        res.json({ success: true, products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Get single Product: api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Change instock status: api/product/stock
export const changeStockStatus = async (req, res) => {
    try {
        const { id, inStock } = req.body; //get the current status of the switch used for instock
        await Product.findByIdAndUpdate(id, { inStock }); //put that status here
        res.json({ success: true, message: error.message });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
