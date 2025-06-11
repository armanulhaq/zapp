import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { assets } from "../assets/assets";

const ProductDetails = () => {
    const { products, navigate, addToCart, removeFromCart, cartItems } =
        useAppContext();
    const { productID } = useParams();

    const getConsistentRandom = (id, min, max) => {
        const lastChar = id.slice(-1);
        return (lastChar.charCodeAt(0) % (max - min + 1)) + min;
    };

    const specificProduct = products.find(
        (product) => product._id === productID
    );
    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (specificProduct) {
            const related = products.filter(
                (relatedProduct) =>
                    specificProduct.category === relatedProduct.category &&
                    relatedProduct._id !== specificProduct._id
            );
            setRelatedProducts(related.slice(0, 5));
        }
    }, [products, specificProduct]);

    useEffect(() => {
        if (specificProduct?.image?.[0]) {
            setThumbnail(specificProduct.image[0]);
        }
    }, [specificProduct]);

    const handleAddToCart = useCallback(() => {
        if (specificProduct?._id) {
            addToCart(specificProduct._id);
        }
    }, [addToCart, specificProduct]);

    const handleRemoveFromCart = useCallback(() => {
        if (specificProduct?._id) {
            removeFromCart(specificProduct._id);
        }
    }, [removeFromCart, specificProduct]);

    const handleBuyNow = useCallback(() => {
        if (specificProduct?._id) {
            addToCart(specificProduct._id);
            navigate("/cart");
        }
    }, [addToCart, navigate, specificProduct]);

    if (!specificProduct) {
        return <div>Product not found</div>;
    }

    const rating = getConsistentRandom(specificProduct._id, 3, 5);
    const reviewCount = getConsistentRandom(specificProduct._id, 10, 1000);
    const currentCartQuantity = cartItems[specificProduct._id] || 0;

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
                                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
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

                    <div className="flex gap-4 mt-10 w-full items-stretch">
                        {/* Add to Cart or Quantity Controls */}
                        <div className="relative w-full">
                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                className={`absolute top-0 left-0 w-full h-full py-3.5 font-medium bg-gray-100 text-gray-800/80 rounded-lg hover:bg-gray-200 transition-opacity duration-300 ${
                                    currentCartQuantity > 0
                                        ? "opacity-0 pointer-events-none"
                                        : "opacity-100"
                                }`}
                            >
                                Add to Cart
                            </button>

                            {/* Quantity Controls */}
                            <div
                                className={`absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3 bg-primary-faded rounded-lg transition-opacity duration-300 ${
                                    currentCartQuantity > 0
                                        ? "opacity-100"
                                        : "opacity-0 pointer-events-none"
                                }`}
                            >
                                <button
                                    onClick={handleRemoveFromCart}
                                    className="text-xl px-3 text-black font-medium hover:bg-black/10 rounded-l transition-all duration-200 active:scale-95"
                                    disabled={currentCartQuantity <= 0}
                                >
                                    -
                                </button>
                                <span className="px-4 text-black font-medium text-lg">
                                    {currentCartQuantity}
                                </span>
                                <button
                                    onClick={handleAddToCart}
                                    className="text-xl px-3 text-black font-medium hover:bg-black/10 rounded-r transition-all duration-200 active:scale-95"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Buy Now */}
                        <button
                            onClick={handleBuyNow}
                            className="w-full py-3.5 font-medium rounded-lg bg-primary hover:bg-primary-faded transition"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
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
    );
};

export default ProductDetails;
