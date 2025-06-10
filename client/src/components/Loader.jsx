import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Loader = () => {
    const { navigate, setCartItems } = useAppContext();
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get("next");
    const clearCart = query.get("clear_cart");

    useEffect(() => {
        if (clearCart === "true") {
            setCartItems({});
        }
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            }, 3000);
        }
    }, [nextUrl, clearCart]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
        </div>
    );
};

export default Loader;
