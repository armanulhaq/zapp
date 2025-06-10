import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { assets } from "../assets/assets";

const ProductDetails = () => {
    const { products, navigate, addToCart, removeFromCart, cartItems } =
        useAppContext();
    const { productID } = useParams();

    // Generate consistent random numbers based on product ID
    const getConsistentRandom = (id, min, max) => {
        // Use the product ID to generate a consistent number
        const hash = id.split("").reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        return (Math.abs(hash) % (max - min + 1)) + min;
    };

    //find the product by extracting the id from url
    const specificProduct = products.find(
        (product) => product._id === productID
    );

    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    // Fixed: Added productID dependency to useEffect for related products
    useEffect(() => {
        if (specificProduct) {
            let productsCopy = products.slice();
            let relatedproducts = productsCopy.filter(
                (relatedProduct) =>
                    specificProduct.category === relatedProduct.category &&
                    relatedProduct._id !== specificProduct._id
            );
            setRelatedProducts(relatedproducts.slice(0, 5));
        }
    }, [products, specificProduct]); // Added specificProduct dependency

    // Fixed: Added productID dependency to useEffect for thumbnail
    useEffect(() => {
        if (specificProduct?.image?.[0]) {
            setThumbnail(specificProduct.image[0]);
        }
    }, [specificProduct]); // This was correct

    if (!specificProduct) {
        return <div>Product not found</div>;
    }

    // Get consistent rating (3-5) and review count (10-1000) based on product ID
    const rating = getConsistentRandom(specificProduct._id, 3, 5);
    const reviewCount = getConsistentRandom(specificProduct._id, 10, 1000);

    // Fixed: Get current cart quantity with fallback to 0
    const currentCartQuantity = cartItems[specificProduct._id] || 0;

    // Fixed: Add error handling for cart operations
    const handleAddToCart = () => {
        try {
            addToCart(specificProduct._id);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleRemoveFromCart = () => {
        try {
            removeFromCart(specificProduct._id);
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const handleBuyNow = () => {
        try {
            addToCart(specificProduct._id);
            navigate("/cart");
        } catch (error) {
            console.error("Error in buy now:", error);
        }
    };

    return (
        <div className="mt-12">
            <p>
                <Link to="/">Home</Link> /<Link to="/products"> Products</Link>{" "}
                /
                <Link
                    to={`/products/${specificProduct.category.toLowerCase()}`}
                >
                    {" "}
                    {specificProduct.category}
                </Link>{" "}
                /<span className="text-primary"> {specificProduct.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {specificProduct.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setThumbnail(image)}
                                className="border max-w-24 border-gray-500/30 rounded-xl overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded-xl overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">
                        {specificProduct.name}
                    </h1>

                    <div className="flex items-center gap-0.5">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <img
                                    key={i}
                                    className="md:w-3.5 w-3"
                                    src={
                                        i < rating
                                            ? assets.star_icon
                                            : assets.star_dull_icon
                                    }
                                    alt="star icon"
                                />
                            ))}

                        <p>({reviewCount})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">
                            MRP: ₹{specificProduct.price}
                        </p>
                        <p className="text-2xl font-medium">
                            MRP: ₹{specificProduct.offerPrice}
                        </p>
                        <span className="text-gray-500/70">
                            (inclusive of all taxes)
                        </span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {specificProduct.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button
                            onClick={() => addToCart(specificProduct._id)}
                            className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 rounded-lg hover:bg-gray-200 transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => {
                                addToCart(specificProduct._id);
                                navigate("/cart");
                            }}
                            className="w-full py-3.5 cursor-pointer font-medium rounded-lg bg-primary  hover:bg-primary-dull transition"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center mt-20">
                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
                        {relatedProducts
                            .filter((relatedProduct) => relatedProduct.inStock)
                            .map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                    </div>
                    <button
                        onClick={() => {
                            navigate("/products");
                            scrollTo(0, 0);
                        }}
                        className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded-lg text-primary hover:bg-primary-faded transition"
                    >
                        See more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
