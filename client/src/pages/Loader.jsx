import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const LoaderPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setCartItems } = useAppContext();

    useEffect(() => {
        const next = searchParams.get("next");
        const clearCart = searchParams.get("clear_cart");

        // Clear cart if requested
        if (clearCart === "true") {
            setCartItems({});
        }

        // Redirect to the next page after a short delay
        const timer = setTimeout(() => {
            if (next) {
                navigate(`/${next}`);
            } else {
                navigate("/");
            }
        }, 2000); // 2 second delay

        return () => clearTimeout(timer);
    }, [searchParams, navigate, setCartItems]);

    return (
        <div className="flex-1 h-screen flex items-center justify-center">
            <Loader context="checkout" />
        </div>
    );
};

export default LoaderPage;
