import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

export const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems } = useAppContext();

    return (
        product && (
            <div className="border border-gray-500/20 rounded-lg md:px-4 px-3 py-2 bg-gray-50 min-w-56 max-w-56 w-full">
                <div className="group cursor-pointer flex items-center justify-center px-2">
                    <img
                        className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>
                <div className="text-gray-500/60 text-sm">
                    <p>{product.category}</p>
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
                                        i < product.rating
                                            ? assets.star_icon
                                            : assets.star_dull_icon
                                    }
                                    alt="star icon"
                                />
                            ))}
                        <p>({product.reviewCount})</p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                        <p className="md:text-xl text-base font-medium text-black">
                            {currency} ₹{product.offerPrice}{" "}
                            <span className="text-gray-500/60 md:text-sm text-xs line-through">
                                {currency} ${product.price}
                            </span>
                        </p>
                        <div
                            className="text-primary"
                            onClick={(e) => {
                                e.stopPropagation(); //Without this, clicking the buttons would also trigger the card's click event
                            }}
                        >
                            {!cartItems[product._id] ? (
                                <button
                                    className="flex items-center justify-center gap-1 text-black bg-primary-faded border border-primary md:w-[80px] w-[64px] h-[34px] rounded-lg font-medium cursor-pointer"
                                    onClick={() => addToCart(product._id)}
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
                                        onClick={() =>
                                            removeFromCart(product._id)
                                        }
                                        className="cursor-pointer text-md px-2 h-full text-black"
                                    >
                                        -
                                    </button>
                                    <span className="w-5 text-center text-black">
                                        {cartItems[product._id]}
                                    </span>
                                    <button
                                        onClick={() => addToCart(product._id)}
                                        className="cursor-pointer text-md px-2 h-full text-black"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
