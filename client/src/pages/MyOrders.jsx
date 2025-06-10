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
        return <Loader />;
    }

    return (
        <div className="my-16 max-w-4xl mx-auto">
            <div className="flex flex-col mb-8">
                <h1 className="text-2xl md:text-3xl font-medium">My Orders</h1>
            </div>
            {myOrders.map((order) => (
                <div
                    key={order._id}
                    className="bg-white rounded-lg border-1 border-gray-300 mb-10 p-6"
                >
                    <div className="flex justify-between items-center text-gray-500 text-sm mb-6">
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
                            className="flex flex-col  md:flex-row justify-between items-start md:items-center py-4 border-t border-gray-100 gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <img
                                        src={item.product.image[0]}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-gray-500">
                                        Category: {item.product.category}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col text-gray-500 gap-4">
                                <p>Quantity: {item.quantity}</p>
                                <p>
                                    Status:{" "}
                                    <span className="bg-green-100 text-green-900 px-3 py-1 rounded-full">
                                        {order.status}
                                    </span>
                                </p>
                                <p>
                                    Date:{" "}
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-sm">
                                Price before tax: ₹
                                <span className="text-lg">
                                    {item.product.offerPrice * item.quantity}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
