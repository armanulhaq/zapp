import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
    const { axios, navigate, setIsSeller, setUser } = useAppContext();

    const sidebarLinks = [
        { name: "Add new product", path: "/seller", icon: assets.add_icon },
        {
            name: "Your products",
            path: "/seller/your-products",
            icon: assets.product_list_icon,
        },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get("/api/seller/logout");
            if (data.success) {
                toast.success(data.message);
                setIsSeller(false);
                setUser(null);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="text-default min-h-screen text-gray-700 bg-white">
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
                <div className="flex items-center gap-2">
                    <img src="/brand.png" alt="logo" className="h-9" />
                    <p className="text-xl font-medium">Seller Dashboard</p>
                </div>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button
                        onClick={logout}
                        className="border-2 border-primary bg-primary-faded rounded-full text-sm px-4 py-2 cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            href={item.path}
                            end={item.path == "/seller"}
                            className={({
                                isActive,
                            }) => `flex items-center py-3 px-4 gap-3
                            ${
                                isActive
                                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                    : "hover:bg-gray-100/90 border-white "
                            }`}
                        >
                            <img src={item.icon} alt="" className="w-7 h-7" />
                            <p className="md:block hidden text-center">
                                {item.name}
                            </p>
                        </NavLink>
                    ))}
                </div>
                {/* Show child components */}
                <Outlet />
            </div>
        </div>
    );
};

export default SellerLayout;
