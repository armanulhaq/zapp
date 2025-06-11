import Product from "../models/product.js";
import cloudinary from "../configs/cloudinary.js";

//Add Product: api/product/add
function uploadBufferToCloudinary(buffer) {
    //we have an image in memory (buffer)
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(buffer);
    });
}

export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData); //turning back string into JSON
        const images = req.files; //put here by multer

        //Upload each image to Cloudinary and get URLs
        let imagesURL = await Promise.all(
            images.map(async (image) => {
                const result = await uploadBufferToCloudinary(image.buffer);
                return result.secure_url;
            })
        );
        // imagesURL is now an array of URLs

        await Product.create({
            ...productData,
            image: imagesURL,
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
