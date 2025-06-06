import { useEffect, useState } from "react";
import { dummyOrders } from "../assets/assets";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const fetchMyOrders = async () => {
        setMyOrders(dummyOrders);
    };
    useEffect(() => {
        fetchMyOrders();
    }, []);
    return (
        <div className="my-16 max-w-4xl mx-auto">
            <div className="flex flex-col mb-8">
                <h1 className="text-2xl md:text-3xl font-medium">My Orders</h1>
            </div>
            {myOrders.map((order) => (
                <div
                    key={order._id}
                    className="bg-white rounded-lg border-1 border-gray-200 mb-6 p-6"
                >
                    <div className="flex justify-between items-center text-gray-500 text-sm mb-6">
                        <span>Order Id : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span className="font-medium">
                            Total Amount : ₹{order.amount}
                        </span>
                    </div>
                    {order.items.map((item) => (
                        <div
                            key={item.product._id}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-t border-gray-100 gap-4"
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
                            <div className="flex flex-col gap-1 text-gray-500">
                                <p>Quantity: {item.quantity}</p>
                                <p>Status: {item.status}</p>
                                <p>
                                    Date:{" "}
                                    {new Date(
                                        order.createAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-green-500 font-medium">
                                Amount: ₹
                                {item.product.offerPrice * item.quantity}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
