import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useCallback } from "react";

export const ProductCard = ({ product }) => {
    const { addToCart, cartItems, navigate } = useAppContext();

    // Get consistent rating and review count
    const getConsistentRandom = (id, min, max) => {
        const lastChar = id.slice(-1);
        return (lastChar.charCodeAt(0) % (max - min + 1)) + min; //doing operations on last character of id
    };

    const rating = getConsistentRandom(product._id, 3, 5);
    const reviewCount = getConsistentRandom(product._id, 10, 1000);

    // Get current cart quantity
    const currentCartQuantity = cartItems?.[product._id] || 0;

    // Cart handlers with debouncing
    //using useCallback prevents function from being recreated on every render
    const handleAddToCart = useCallback(
        (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (addToCart && product._id) {
                addToCart(product._id);
            }
        },
        [addToCart, product._id]
    );

    const handleCardClick = useCallback(() => {
        if (navigate && product.category && product._id) {
            navigate(
                `/products/${product.category.toLowerCase()}/${product._id}`
            );
            window.scrollTo(0, 0);
        }
    }, [navigate, product.category, product._id]);

    // Early return if no product
    if (!product || !product._id) return null;

    return (
        <div
            onClick={handleCardClick}
            className="border border-gray-500/20 rounded-lg md:px-4 px-3 py-5 w-full cursor-pointer hover:shadow-md transition-all duration-300"
        >
            {/* Product Image */}
            <div className="group flex items-center justify-center p-2">
                <img
                    className="group-hover:scale-105 transition-transform duration-300 max-w-26 md:max-w-36 rounded-lg"
                    src={product.image?.[0] || "/placeholder-image.jpg"}
                    alt={product.name || "Product image"}
                    onError={(e) => {
                        e.target.src = "/placeholder_image.png";
                    }}
                />
            </div>

            {/* Product Info */}
            <div className="text-gray-500/60 text-sm">
                {/* Category */}
                <p className="bg-primary-faded rounded-full w-fit px-2 py-0.5 my-2 border border-primary text-xs">
                    {product.category}
                </p>

                {/* Product Name */}
                <p
                    className="text-gray-700 font-medium text-lg truncate w-full"
                    title={product.name}
                >
                    {product.name}
                </p>

                {/* Rating */}
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

                {/* Price and Cart */}
                <div className="flex items-end justify-between mt-3">
                    {/* Price */}
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

                    {/* Cart Button */}
                    <div className="text-primary">
                        <button
                            className={`flex items-center justify-center gap-1 text-black ${
                                currentCartQuantity > 0
                                    ? "bg-red-100 text-red-400"
                                    : "bg-primary-faded border border-primary"
                            } md:w-[80px] w-[64px] h-[34px] rounded-lg font-medium cursor-pointer hover:bg-gray-200 transition-all duration-200 active:scale-95`}
                            onClick={handleAddToCart}
                            aria-label={`${
                                currentCartQuantity > 0 ? "Remove" : "Add"
                            } ${product.name} to cart`}
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
                                    stroke={
                                        currentCartQuantity > 0
                                            ? "#000"
                                            : "#000"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <span className="hidden md:inline">
                                {currentCartQuantity > 0 ? "Remove" : "Add"}
                            </span>
                            <span className="md:hidden">
                                {currentCartQuantity > 0 ? "×" : "+"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
