import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { axios } = useAppContext();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/order/seller");
            if (data.success) {
                setOrders(data.orders);
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
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 h-screen flex items-center justify-center">
                <Loader context="sellerOrders" />
            </div>
        );
    }

    return (
        <div className="flex-1 h-screen overflow-y-auto bg-background p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    Orders List
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage and track your orders
                </p>
            </div>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="bg-card rounded-xl border-1 bg-gray-50 border-gray-200 border-border overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                {/* Product Items Section */}
                                <div className="flex-1 min-w-0 flex items-center">
                                    <div className="flex items-start gap-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="space-y-2">
                                                {order.items.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <span className="font-medium text-foreground truncate">
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </span>
                                                            <span className="bg-yellow-100 text-yellow-400  px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                                                                x{item.quantity}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Details Section */}
                                <div className="lg:w-64 flex-shrink-0">
                                    <div className="bg-muted/30 rounded-lg p-4">
                                        <h3 className="font-semibold text-foreground mb-2 text-sm uppercase tracking-wide">
                                            Customer Details
                                        </h3>
                                        <div className="space-y-1 text-sm">
                                            <p className="font-medium text-foreground">
                                                {order.address.firstName}{" "}
                                                {order.address.lastName}
                                            </p>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {order.address.street}
                                                <br />
                                                {order.address.city},{" "}
                                                {order.address.state}
                                                <br />
                                                {order.address.zipcode},{" "}
                                                {order.address.country}
                                            </p>
                                            <p className="text-muted-foreground font-mono">
                                                {order.address.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Summary Section */}
                                <div className="lg:w-48 flex-shrink-0">
                                    <div className="space-y-4">
                                        {/* Amount */}
                                        <div className="text-center lg:text-left">
                                            <p className="text-2xl font-bold text-foreground">
                                                ₹{order.amount}
                                            </p>
                                        </div>

                                        {/* Order Details */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-1">
                                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                                    Method
                                                </span>
                                                <span className="text-sm font-medium text-foreground">
                                                    {order.paymentType}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-1">
                                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                                    Date
                                                </span>
                                                <span className="text-sm font-medium text-foreground">
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-1">
                                                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                                    Payment
                                                </span>
                                                <span
                                                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                                                        order.isPaid
                                                            ? "bg-green-100 text-green-800 dark:text-green-400"
                                                            : "bg-yellow-100 text-yellow-800 dark:text-yellow-400"
                                                    }`}
                                                >
                                                    {order.isPaid
                                                        ? "Paid"
                                                        : "Pending"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {orders.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <img
                                className="w-8 h-8 opacity-50"
                                src={assets.box_icon}
                                alt="No orders"
                            />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                            No orders yet! Time to make some sales magic! ✨
                        </h3>
                        <p className="text-muted-foreground">
                            Your order list is as empty as a shopping cart on a
                            diet.
                            <br />
                            Don't worry, customers will come flocking soon! 🚀
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
