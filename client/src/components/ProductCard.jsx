import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

export const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    // Generate consistent random numbers based on product ID
    const getConsistentRandom = (id, min, max) => {
        // Use the product ID to generate a consistent number
        const hash = id.split("").reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        return (Math.abs(hash) % (max - min + 1)) + min;
    };

    // Get consistent rating (3-4) and review count (10-1000) based on product ID
    const rating = getConsistentRandom(product._id, 3, 5);
    const reviewCount = getConsistentRandom(product._id, 10, 1000);

    // Fixed: Get current cart quantity with fallback to 0
    const currentCartQuantity = cartItems[product._id] || 0;

    // Fixed: Add error handling for cart operations
    const handleAddToCart = (e) => {
        e.stopPropagation();
        try {
            addToCart(product._id);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        try {
            removeFromCart(product._id);
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const handleCardClick = () => {
        try {
            navigate(
                `/products/${product.category.toLowerCase()}/${product._id}`
            );
            scrollTo(0, 0);
        } catch (error) {
            console.error("Error navigating to product:", error);
        }
    };

    // Fixed: Add null check for product
    if (!product) {
        return null;
    }

    return (
        <div
            onClick={handleCardClick}
            className="border border-gray-500/20 rounded-lg md:px-4 px-3 py-5 w-full cursor-pointer"
        >
            <div className="group flex items-center justify-center p-2">
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36 rounded-lg"
                    src={product.image?.[0] || "/placeholder-image.jpg"}
                    alt={product.name || "Product image"}
                    onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                    }}
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p className="bg-primary-faded rounded-full w-fit px-2 py-0.1 my-2 border-1 border-primary text-xs">
                    {product.category}
                </p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">
                    {product.name}
                </p>
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
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-black">
                        ₹{product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through">
                            ₹{product.price}
                        </span>
                    </p>
                    <div className="text-primary">
                        {/* Fixed: Use currentCartQuantity instead of direct cartItems access */}
                        {currentCartQuantity === 0 ? (
                            <button
                                className="flex items-center justify-center gap-1 text-black bg-primary-faded border border-primary md:w-[80px] w-[64px] h-[34px] rounded-lg font-medium cursor-pointer hover:bg-primary/20 transition"
                                onClick={handleAddToCart}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary rounded select-none">
                                <button
                                    onClick={handleRemoveFromCart}
                                    className="cursor-pointer text-md px-2 h-full text-black hover:bg-black/10 rounded-l transition"
                                >
                                    -
                                </button>
                                <span className="w-5 text-center text-black">
                                    {currentCartQuantity}
                                </span>
                                <button
                                    onClick={handleAddToCart}
                                    className="cursor-pointer text-md px-2 h-full text-black hover:bg-black/10 rounded-r transition"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
