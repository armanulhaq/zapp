import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { axios, user } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/order/user");
            if (data.success) {
                setMyOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (user) {
            fetchMyOrders();
        }
    }, [user]);

    if (loading) {
        return <Loader context="userOrders" />;
    }

    return (
        <div className="my-16 max-w-7xl mx-auto">
            <div className="flex flex-col mb-8">
                <h1 className="text-2xl md:text-3xl font-medium">My Orders</h1>
            </div>
            {myOrders.map((order) => (
                <div
                    key={order._id}
                    className="bg-white rounded-lg border-1 border-gray-300 mb-10 p-6"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-500 text-sm mb-6 gap-2">
                        <span>Order ID : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span className="font-medium text-green-500">
                            Total (Incl. Taxes):{" "}
                            <span className="text-xl">₹{order.amount}</span>
                        </span>
                    </div>
                    {order.items.map((item) => (
                        <div
                            key={item.product._id}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center py-4 border-t border-gray-100"
                        >
                            {/* Product Image and Info - Fixed width */}
                            <div className="lg:col-span-4 flex items-center gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg flex-shrink-0">
                                    <img
                                        src={item.product.image[0]}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-lg font-medium">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-gray-500">
                                        Category: {item.product.category}
                                    </p>
                                </div>
                            </div>

                            {/* Quantity and Date - Fixed width */}
                            <div className="lg:col-span-2 text-gray-500">
                                <p>Quantity: {item.quantity}</p>
                                <p>
                                    Date:{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Status - Fixed width */}
                            <div className="lg:col-span-3 text-gray-500">
                                <p>
                                    Status:{" "}
                                    <span className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-sm">
                                        {order.status}
                                    </span>
                                </p>
                            </div>

                            {/* Price - Fixed width */}
                            <div className="lg:col-span-3 text-right">
                                <p className="text-gray-600 text-sm">
                                    Price before tax:
                                </p>
                                <p className="text-lg font-semibold">
                                    ₹{item.product.offerPrice * item.quantity}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
