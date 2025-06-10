import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

export const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems, navigate, isAuthenticated } =
        useAppContext();
    const [optimisticQuantity, setOptimisticQuantity] = useState(null);

    // Generate consistent random numbers based on product ID
    const getConsistentRandom = (id, min, max) => {
        // Use the product ID to generate a consistent number
        const hash = id.split("").reduce((acc, char) => {
            return char.charCodeAt(0) + ((acc << 5) - acc);
        }, 0);
        return (Math.abs(hash) % (max - min + 1)) + min;
    };

    // Early return if no product
    if (!product || !product._id) {
        return null;
    }

    // Get consistent rating (3-5) and review count (10-1000) based on product ID
    const rating = getConsistentRandom(product._id, 3, 5);
    const reviewCount = getConsistentRandom(product._id, 10, 1000);

    // Get current cart quantity with fallback to 0
    const actualCartQuantity = cartItems?.[product._id] || 0;
    const currentCartQuantity =
        optimisticQuantity !== null ? optimisticQuantity : actualCartQuantity;

    // Reset optimistic state when actual state catches up
    useEffect(() => {
        if (
            optimisticQuantity !== null &&
            optimisticQuantity === actualCartQuantity
        ) {
            setOptimisticQuantity(null);
        }
    }, [actualCartQuantity, optimisticQuantity]);

    // Reset optimistic state when user logs out
    useEffect(() => {
        if (!isAuthenticated && optimisticQuantity !== null) {
            setOptimisticQuantity(null);
        }
    }, [isAuthenticated, optimisticQuantity]);

    // Event handlers with optimistic updates
    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            if (addToCart && product._id) {
                // Call addToCart first - it will handle auth check and show login if needed
                const result = addToCart(product._id);

                // Only apply optimistic update if user is authenticated
                // You can also check the result of addToCart if it returns a promise/boolean
                if (isAuthenticated) {
                    const newQuantity = currentCartQuantity + 1;
                    setOptimisticQuantity(newQuantity);
                }
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            // Reset optimistic state on error
            setOptimisticQuantity(null);
        }
    };

    const handleRemoveFromCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            if (removeFromCart && product._id) {
                // Call removeFromCart first
                const result = removeFromCart(product._id);

                // Only apply optimistic update if user is authenticated
                if (isAuthenticated) {
                    const newQuantity = Math.max(0, currentCartQuantity - 1);
                    setOptimisticQuantity(newQuantity);
                }
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            // Reset optimistic state on error
            setOptimisticQuantity(null);
        }
    };

    const handleCardClick = () => {
        try {
            if (navigate && product.category && product._id) {
                navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                );
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error("Error navigating to product:", error);
        }
    };

    return (
        <div
            onClick={handleCardClick}
            className="border border-gray-500/20 rounded-lg md:px-4 px-3 py-5 w-full cursor-pointer hover:shadow-md transition-shadow"
        >
            <div className="group flex items-center justify-center p-2">
                <img
                    className="group-hover:scale-105 transition-transform duration-300 max-w-26 md:max-w-36 rounded-lg"
                    src={product.image?.[0] || "/placeholder-image.jpg"}
                    alt={product.name || "Product image"}
                    onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                    }}
                />
            </div>

            <div className="text-gray-500/60 text-sm">
                <p className="bg-primary-faded rounded-full w-fit px-2 py-0.5 my-2 border border-primary text-xs">
                    {product.category}
                </p>

                <p
                    className="text-gray-700 font-medium text-lg truncate w-full"
                    title={product.name}
                >
                    {product.name}
                </p>

                <div className="flex items-center gap-0.5 mb-2">
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
                                alt={`${i < rating ? "filled" : "empty"} star`}
                            />
                        ))}
                    <p className="text-xs ml-1">({reviewCount})</p>
                </div>

                <div className="flex items-end justify-between mt-3">
                    <div className="flex flex-col">
                        <p className="md:text-xl text-base font-medium text-black">
                            ₹{product.offerPrice}
                        </p>
                        {product.price !== product.offerPrice && (
                            <p className="text-gray-500/60 md:text-sm text-xs line-through">
                                ₹{product.price}
                            </p>
                        )}
                    </div>

                    <div className="text-primary">
                        {currentCartQuantity === 0 ? (
                            <button
                                className="flex items-center justify-center gap-1 text-black bg-primary-faded border border-primary md:w-[80px] w-[64px] h-[34px] rounded-lg font-medium cursor-pointer hover:bg-primary/20 transition-colors duration-200 active:scale-95"
                                onClick={handleAddToCart}
                                aria-label={`Add ${product.name} to cart`}
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                                        stroke="#000"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span className="hidden md:inline">Add</span>
                                <span className="md:hidden">+</span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-1 md:w-20 w-16 h-[34px] bg-primary rounded select-none">
                                <button
                                    onClick={handleRemoveFromCart}
                                    className="cursor-pointer text-lg px-2 h-full text-black hover:bg-black/10 rounded-l transition-colors duration-200 active:scale-95 flex items-center justify-center"
                                    aria-label={`Remove one ${product.name} from cart`}
                                    disabled={currentCartQuantity <= 0}
                                >
                                    −
                                </button>
                                <span
                                    className="flex-1 text-center text-black font-medium text-sm transition-all duration-200"
                                    aria-label={`${currentCartQuantity} items in cart`}
                                    key={currentCartQuantity} // Force re-render on quantity change
                                >
                                    {currentCartQuantity}
                                </span>
                                <button
                                    onClick={handleAddToCart}
                                    className="cursor-pointer text-lg px-2 h-full text-black hover:bg-black/10 rounded-r transition-colors duration-200 active:scale-95 flex items-center justify-center"
                                    aria-label={`Add one more ${product.name} to cart`}
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
