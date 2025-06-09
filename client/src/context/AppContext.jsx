import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true; //Lets cookies be sent with requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL; //"This is where my server is"

export const AppContext = createContext(); //1. Step1: Create a context

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const fetchSellerStatus = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");
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
            setUser(data.user);
            setCartItems(data.user.cartItems);
        } catch (error) {
            setUser(null);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("/api/product/list");
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addToCart = async (itemId) => {
        try {
            // Create a deep copy of the current cart items to avoid direct state mutation
            let cartData = structuredClone(cartItems);
            //Checking if a product is already in the cartData. If yes +1, if no 1.
            if (cartData[itemId]) {
                cartData[itemId] += 1;
            } else {
                cartData[itemId] = 1;
            }
            setCartItems(cartData);

            // Update cart in backend
            const { data } = await axios.post("/api/cart/update", {
                userId: user._id,
                cartItems: cartData,
            });

            if (data.success) {
                toast.success("Added to cart");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //Update cart item quantity
    const updateCartItem = async (itemId, quantity) => {
        try {
            let cartData = structuredClone(cartItems);
            cartData[itemId] = quantity;
            setCartItems(cartData);

            // Update cart in backend
            const { data } = await axios.post("/api/cart/update", {
                userId: user._id,
                cartItems: cartData,
            });

            if (data.success) {
                toast.success("Cart updated");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //remove product from cart
    const removeFromCart = async (itemId) => {
        try {
            let cartData = structuredClone(cartItems);
            if (cartData[itemId]) {
                cartData[itemId] -= 1;
                if (cartData[itemId] === 0) {
                    delete cartData[itemId];
                }
            }

            setCartItems(cartData);

            // Update cart in backend
            const { data } = await axios.post("/api/cart/update", {
                userId: user._id,
                cartItems: cartData,
            });

            if (data.success) {
                toast.success("Removed from cart");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
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

    useEffect(() => {
        fetchUser();
        fetchSellerStatus();
        fetchProducts();
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
        currency,
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
    };

    //. Step4: Provide the context value to the children {app.jsx}
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    // Custom hook to use the context easily in any child component
    return useContext(AppContext);
};
