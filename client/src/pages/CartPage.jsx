import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const CartPage = () => {
    const [cartArray, setCartArray] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");
    const [showAddressSelectionBox, setShowAddressSelectionBox] =
        useState(false);

    const {
        cartItems,
        products,
        removeFromCart,
        updateCartItem,
        navigate,
        axios,
        getCartAmount,
        user,
        setCartItems,
        refreshCartData,
    } = useAppContext();

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const paymentCanceled = query.get("payment_canceled");
    const newAddressId = location.state?.newAddressId;

    useEffect(() => {
        refreshCartData(true);
    }, [location.search]);

    useEffect(() => {
        if (paymentCanceled === "true") {
            toast.error(
                "Payment was cancelled. Your cart items are still available."
            );
            refreshCartData(true);
        }
    }, [paymentCanceled]);

    const getCart = () => {
        let tempArray = [];
        for (const key in cartItems) {
            const cartItem = products.find((item) => item._id === key);
            if (cartItem) {
                cartItem.quantity = cartItems[key];
                tempArray.push(cartItem);
            }
        }
        setCartArray(tempArray);
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) {
            getCart();
        }
    }, [products, cartItems]);

    useEffect(() => {
        if (user) {
            // Fetch addresses and set selected address
            const fetchAddresses = async () => {
                try {
                    const { data } = await axios.get(
                        "/api/address/get-address"
                    );
                    if (data.success) {
                        if (data.addresses.length > 0) {
                            if (newAddressId) {
                                // Select the newly added address
                                const newlyAddedAddress = data.addresses.find(
                                    (addr) => addr._id === newAddressId
                                );
                                if (newlyAddedAddress) {
                                    setSelectedAddress(newlyAddedAddress);
                                } else {
                                    // Fallback to the first address if newAddressId not found
                                    setSelectedAddress(data.addresses[0]);
                                }
                            } else {
                                // Select the first address if no new address was added
                                setSelectedAddress(data.addresses[0]);
                            }
                        }
                    } else {
                        toast.error(data.message);
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            };
            fetchAddresses();
        }
    }, [user, newAddressId]);

    const placeOrder = async () => {
        try {
            if (!selectedAddress) {
                return toast.error("Please select an address to proceed.");
            }
            //COD
            if (paymentOption === "COD") {
                const { data } = await axios.post("/api/order/cod", {
                    userId: user._id,
                    items: cartArray.map((item) => ({
                        product: item._id,
                        quantity: item.quantity,
                    })),
                    address: selectedAddress._id,
                });

                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate("/my-orders");
                } else {
                    toast.error(data.message);
                }
            }
            //Stripe
            else {
                const { data } = await axios.post("/api/order/stripe", {
                    userId: user._id,
                    items: cartArray.map((item) => ({
                        product: item._id,
                        quantity: item.quantity,
                    })),
                    address: selectedAddress._id,
                });

                if (data.success) {
                    toast.success(data.message);
                    window.location.replace(data.url);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return cartArray.length > 0 ? (
        <div className="flex flex-col md:flex-row mt-16 mb-20 border-b-1 border-gray-200 pb-20">
            <div className="flex-1 max-w-4xl border border-gray-200 rounded-lg p-6">
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
                            ₹{product.offerPrice * cartItems[product._id]}
                        </p>
                        <div className="flex items-center justify-center">
                            <img
                                className="cursor-pointer w-6 h-6"
                                src={assets.remove_icon}
                                alt="remove icon"
                                onClick={() => removeFromCart(product._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* Order Summary */}
            <div className="md:max-w-[400px] w-full mt-10 md:mt-0 md:ml-10">
                <h2 className="text-2xl font-medium mb-4">Order Summary</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    {/* Delivery Address */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2 flex justify-between items-center">
                            DELIVERY ADDRESS
                            {selectedAddress && (
                                <span
                                    className="text-primary cursor-pointer text-sm"
                                    onClick={() =>
                                        setShowAddressSelectionBox(
                                            !showAddressSelectionBox
                                        )
                                    }
                                >
                                    Change
                                </span>
                            )}
                        </h3>
                        {selectedAddress ? (
                            showAddressSelectionBox ? (
                                <div className="border border-gray-300 rounded-md p-4">
                                    <p className="text-gray-700">
                                        {selectedAddress.street},{" "}
                                        {selectedAddress.city},{" "}
                                        {selectedAddress.state},{" "}
                                        {selectedAddress.country}
                                    </p>
                                    <p
                                        className="text-primary cursor-pointer mt-4"
                                        onClick={() => navigate("/add-address")}
                                    >
                                        Add address
                                    </p>
                                </div>
                            ) : (
                                <div className="text-gray-700">
                                    <p>
                                        {selectedAddress.firstName}{" "}
                                        {selectedAddress.lastName}
                                    </p>
                                    <p>{selectedAddress.street}</p>
                                    <p>
                                        {selectedAddress.city},{" "}
                                        {selectedAddress.state}{" "}
                                        {selectedAddress.zipcode}
                                    </p>
                                    <p>{selectedAddress.country}</p>
                                    <p>Phone: {selectedAddress.phone}</p>
                                </div>
                            )
                        ) : (
                            <button
                                onClick={() => navigate("/add-address")}
                                className="text-primary"
                            >
                                Add Address
                            </button>
                        )}
                    </div>

                    {/* Payment Method */}
                    <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">
                            PAYMENT METHOD
                        </h3>
                        <select
                            onChange={(e) => setPaymentOption(e.target.value)}
                            value={paymentOption}
                            className="w-full p-2 border border-gray-300 rounded outline-none"
                        >
                            <option value="COD">Cash On Delivery</option>
                            <option value="Stripe">Stripe</option>
                        </select>
                    </div>

                    {/* Price Details */}
                    <div className="text-gray-700">
                        <div className="flex justify-between mb-2">
                            <span>Price</span>
                            <span>₹{getCartAmount()}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping Fee</span>
                            <span className="text-green-500">Free</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span>Tax (7%)</span>
                            <span>
                                ₹
                                {Math.floor(getCartAmount() * 0.07 * 100) / 100}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-4">
                            <span>Total Amount:</span>
                            <span>
                                ₹
                                {Math.floor(
                                    (getCartAmount() + getCartAmount() * 0.07) *
                                        100
                                ) / 100}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={placeOrder}
                        className="mt-6 w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition cursor-pointer"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center h-full my-10 text-center">
            <img
                src={assets.empty_box}
                alt="empty cart icon"
                className="w-24 h-24 mb-6"
            />
            <h2 className="text-2xl font-medium mb-3">Your cart is empty!</h2>
            <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
            </p>
            <button
                onClick={() => navigate("/products")}
                className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition cursor-pointer"
            >
                Explore Products
            </button>
        </div>
    );
};

export default CartPage;
