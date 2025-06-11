import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true; //Lets cookies be sent with requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; //"This is where my server is"

export const AppContext = createContext(); //1. Step1: Create a context

export const AppContextProvider = ({ children }) => {
    //It is wrapped around App so children is app

    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [forceRefresh, setForceRefresh] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchSellerStatus = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth"); //when this route is hit with post request, middleware runs and authenticates and then controller runs and gives data
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            toast.error(error.message);
            setIsSeller(false);
        }
    };

    //fetch user auth status and user data and cart items
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("api/user/is-auth");
            if (data.success) {
                setUser(data.user);
                setCartItems(data.user.cartItems);
            } else {
                setUser(null);
                setCartItems({});
            }
        } catch (error) {
            console.error("Error fetching user:", error.message);
            setUser(null);
            setCartItems({});
            // Only show error toast if it's not a 401 (unauthorized) error
            if (error.response?.status !== 401) {
                toast.error("Failed to fetch user data");
            }
        }
    };

    const fetchProducts = async (optimisticProducts) => {
        try {
            if (optimisticProducts) {
                setProducts(optimisticProducts);
                return;
            }
            setLoading(true);
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    //Frontend function that updates the state and sends it via post request to the the backend which is then catched by updateCart controller to update the DB
    const addToCart = async (itemId) => {
        try {
            if (!user) {
                setShowUserLogin(true);
                return false;
            }

            // Create new cart state
            const newCartItems = { ...cartItems };
            if (newCartItems[itemId]) {
                // If item exists in cart, remove it
                delete newCartItems[itemId];
            } else {
                // If item doesn't exist, add it
                newCartItems[itemId] = 1;
            }

            // Update local state first for immediate feedback
            setCartItems(newCartItems);

            // Then sync with backend
            const { data } = await axios.post("/api/cart/update", {
                userId: user._id,
                cartItems: newCartItems,
            });
            if (!data.success) {
                // Revert local state if backend update fails
                setCartItems(cartItems);
                toast.error(data.message);
                return false;
            } else {
                toast.success(
                    cartItems[itemId] ? "Removed from cart" : "Added to cart."
                );
                return true;
            }
        } catch (error) {
            // Revert local state if API call fails
            setCartItems(cartItems);
            if (error.response?.status === 401) {
                setUser(null);
                setCartItems({});
                setShowUserLogin(true);
            }
            toast.error(error.message);
            return false;
        }
    };

    //Updates the Cart: used in the cart page's select
    const updateCartItem = async (itemId, quantity) => {
        //id and quantity comes from frontend
        try {
            if (!user) {
                setShowUserLogin(true);
                return;
            }

            let cartData = structuredClone(cartItems);
            cartData[itemId] = quantity; //update the quantity of the cartItem with this itemId

            // Update cart in backend first
            const { data } = await axios.post("/api/cart/update", {
                userId: user._id,
                cartItems: cartData,
            });

            if (data.success) {
                // Only update state after successful API call
                setCartItems(cartData);
                toast.success("Cart updated");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null);
                setCartItems({});
                setShowUserLogin(true);
            }
            toast.error(error.message);
        }
    };

    //remove product from cart
    const removeFromCart = async (itemId) => {
        try {
            if (!user) {
                setShowUserLogin(true);
                return;
            }
            let cartData = structuredClone(cartItems);

            // Completely remove the item from cart
            if (cartData[itemId]) {
                delete cartData[itemId];
            }

            // Update cart in backend first
            const { data } = await axios.post("/api/cart/update", {
                userId: user._id,
                cartItems: cartData,
            });

            if (data.success) {
                // Only update state after successful API call
                setCartItems(cartData);
                toast.success("Removed from cart");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setUser(null);
                setCartItems({});
                setShowUserLogin(true);
            }
            toast.error(error.message);
        }
    };

    //calculate total cart items
    const getCartCount = () => {
        let totalCount = Object.keys(cartItems).length;
        return totalCount;
    };

    //get cart value
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    // Add a new function to refresh cart data
    const refreshCartData = async (force = false) => {
        try {
            if (user) {
                const { data } = await axios.get("api/user/is-auth");
                if (data.success) {
                    setCartItems(data.user.cartItems || {});
                    if (force) {
                        setForceRefresh((prev) => prev + 1);
                    }
                }
            }
        } catch (error) {
            console.error("Error refreshing cart:", error);
            setCartItems({});
        }
    };

    useEffect(() => {
        fetchUser();
        fetchSellerStatus();
        fetchProducts();

        // Set up periodic auth check
        const authCheckInterval = setInterval(() => {
            fetchUser();
            fetchSellerStatus();
        }, 5 * 60 * 1000); // Check every 5 minutes

        // Clean up interval on unmount
        return () => clearInterval(authCheckInterval);
    }, []);

    // Add auth check on window focus
    useEffect(() => {
        const handleFocus = () => {
            fetchUser();
            fetchSellerStatus();
        };

        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, []);

    useEffect(() => {
        const updatedCart = async () => {
            const { data } = await axios.post("api/cart/update", { cartItems });
            try {
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
        if (user) {
            updatedCart();
        }
    }, [cartItems]);

    // Refresh cart on route changes
    useEffect(() => {
        refreshCartData(true);
    }, [location.pathname]);

    // Add visibility change handler to refresh cart when returning to the tab
    useEffect(() => {
        const handleVisibilityChange = () => {
            // document.visibilityState can be:
            // "visible" - tab is active
            // "hidden" - tab is not active
            if (document.visibilityState === "visible") {
                refreshCartData(true);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [user]);

    // Force refresh cart when returning from external pages
    useEffect(() => {
        const handlePopState = () => {
            refreshCartData(true);
        };
        // Add event listener for browser back/forward
        window.addEventListener("popstate", handlePopState);
        return () => {
            // Clean up when component unmounts
            window.removeEventListener("popstate", handlePopState);
        };
    }, [user]);

    //Step3: put all the states that are needed in a single object
    const value = {
        navigate,
        user,
        setUser,
        setIsSeller,
        isSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        addToCart,
        updateCartItem,
        removeFromCart,
        cartItems,
        searchQuery,
        setSearchQuery,
        getCartAmount,
        getCartCount,
        axios,
        fetchProducts,
        setCartItems,
        refreshCartData,
        forceRefresh,
        loading,
    };

    //. Step4: Provide the context value to the children {App.jsx}
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    // Custom hook to use the context easily in any child component
    return useContext(AppContext);
};
