import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import AddAddresses from "./pages/AddAddresses";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/Seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import LoaderPage from "./pages/Loader";

function App() {
    const isSellerPath = useLocation().pathname.includes("seller");

    const { showUserLogin, isSeller } = useAppContext();
    return (
        <div className="flex flex-col min-h-screen">
            {isSellerPath ? null : <Navbar />}
            {showUserLogin ? <Login /> : null}
            <Toaster />
            <div
                className={`flex-1 ${
                    isSellerPath
                        ? ""
                        : "flex-1 max-w-7xl mx-auto px-3 sm:px-6 w-full"
                }`}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<AllProducts />} />
                    <Route
                        path="/products/:category"
                        element={<ProductCategory />}
                    />
                    <Route
                        path="/products/:category/:productID"
                        element={<ProductDetails />}
                    />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/add-address" element={<AddAddresses />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/loader" element={<LoaderPage />} />
                    <Route
                        path="/seller"
                        element={!isSeller ? <SellerLogin /> : <SellerLayout />}
                    >
                        <Route
                            index
                            element={isSeller ? <AddProduct /> : null}
                        />
                        <Route path="your-products" element={<ProductList />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                </Routes>
            </div>
            {!isSellerPath && <Footer />}
        </div>
    );
}

export default App;
