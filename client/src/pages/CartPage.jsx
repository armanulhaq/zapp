import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";

const CartPage = () => {
    const [showAddress, setShowAddress] = useState(false);
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");

    const {
        cartItems,
        products,
        removeFromCart,
        updateCartItem,
        navigate,
        getCartAmount,
    } = useAppContext();

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const cartItem = products.find((item) => item._id === key);
            cartItem.quantity = cartItems[key];
            tempArray.push(cartItem);
        }
        setCartArray(tempArray);
    };
    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    const placeOrder = async () => {};

    return products.length > 0 ? (
        <div className="flex flex-col md:flex-row mt-16 mb-20 border-b-1 border-gray-200 pb-20">
            <div className="flex-1 max-w-4xl ">
                <h1 className="text-3xl font-medium mb-6">
                    Your Groceries' Cart{" "}
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>
                {cartArray.map((product, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[2fr_1fr_1fr]  text-gray-500 items-center text-sm md:text-base font-medium pt-3"
                    >
                        <div className="flex items-center md:gap-6 gap-3">
                            <div
                                onClick={() => {
                                    navigate(
                                        `/products/${product.category.toLowerCase()}/${
                                            product._id
                                        }`
                                    );
                                    scrollTo(0, 0);
                                }}
                                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                            >
                                <img
                                    className="max-w-full h-full object-cover"
                                    src={product.image[0]}
                                    alt={product.name}
                                />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">
                                    {product.name}
                                </p>
                                <div className="font-normal text-gray-500/70">
                                    <div className="flex items-center">
                                        <p>Quantity: </p>
                                        <select
                                            onChange={(e) =>
                                                updateCartItem(
                                                    product._id,
                                                    Number(e.target.value)
                                                )
                                            }
                                            value={cartItems[product._id]}
                                            className="outline-none"
                                        >
                                            {Array(
                                                cartItems[products._id] > 9
                                                    ? cartItems[product._id]
                                                    : 9
                                            )
                                                .fill("")
                                                .map((_, index) => (
                                                    <option
                                                        key={index}
                                                        value={index + 1}
                                                    >
                                                        {index + 1}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">
                            ₹{product.offerPrice * product.quantity}
                        </p>
                        <button className="cursor-pointer mx-auto">
                            <img
                                src={assets.remove_icon}
                                alt="remove icon"
                                className="inline-block w-6 h-6"
                                onClick={() => removeFromCart()}
                            />
                        </button>
                    </div>
                ))}
            </div>

            <div className="max-w-[360px] w-full bg-gray-50 p-5 max-md:mt-16 border border-gray-300/70 rounded-lg">
                <h2 className="text-xl md:text-xl font-medium">
                    Order Summary
                </h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">
                        Delivery Address
                    </p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress
                                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                                : "No address found"}
                        </p>
                        <button
                            onClick={() => setShowAddress(!showAddress)}
                            className="text-primary hover:underline cursor-pointer"
                        >
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full rounded-lg px-2 ">
                                {addresses.map((address, index) => (
                                    <p
                                        key={index}
                                        onClick={() => {
                                            setSelectedAddress(address);
                                            setShowAddress(false);
                                        }}
                                        className="text-gray-500 p-2 hover:bg-gray-100 border-b-1 "
                                    >
                                        {address.street}, {address.city},{" "}
                                        {address.state}, {address.country},
                                    </p>
                                ))}
                                <p
                                    onClick={() => {
                                        navigate("/add-address");
                                    }}
                                    className="text-primary text-center cursor-pointer p-2 hover:bg-primary-dull hover:text-black"
                                >
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">
                        Payment Method
                    </p>

                    <select
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded-lg "
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online Payment">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span>
                        <span>₹{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span>
                        <span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (7%)</span>
                        <span>₹{(getCartAmount() * 0.07).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span>
                        <span>
                            ₹
                            {(getCartAmount() + getCartAmount() * 0.07).toFixed(
                                2
                            )}
                        </span>
                    </p>
                </div>

                <button
                    onClick={placeOrder}
                    className="w-full py-3 mt-6 cursor-pointer bg-primary font-medium hover:bg-primary-dull rounded-lg  transition"
                >
                    {paymentOption === "COD"
                        ? "Place Order"
                        : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null;
};

export default CartPage;
