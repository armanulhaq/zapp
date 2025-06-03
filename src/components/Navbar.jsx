import { useState } from "react";
import "../index.css";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

export const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, setUser, setShowUserLogin, navigate } = useAppContext();

    const logout = async () => {
        setUser(null);
        navigate("/");
        setOpen(false);
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-100 bg-white relative transition-all">
            <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="flex justify-center items-center gap-2"
            >
                <img className="h-9" src="/brand.png" alt="Zapp Logo" />
                <div className="text-yellow-400 font-extrabold text-3xl">
                    Zapp
                </div>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-100  bg-gray-50 pr-5 rounded-xl">
                    <input
                        className="px-5 py-3 w-full outline-none placeholder-gray-300 rounded-xl"
                        type="text"
                        placeholder="Search products"
                    />
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.836 10.615 15 14.695"
                            stroke="#7A7B7D"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            clipRule="evenodd"
                            d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
                            stroke="#7A7B7D"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-[#ffd60a] w-[18px] h-[18px] rounded-full">
                        3
                    </button>
                </div>
                {!user ? (
                    <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white font-md text-sm rounded-lg font-bold">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src={assets.profile_icon} className="w-10" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li
                                onClick={() => navigate("/my-orders")}
                                className="p-1.5 pl-3 hover-bg-primary/10 cursor-pointer"
                            >
                                My Orders
                            </li>
                            <li
                                onClick={logout}
                                className="p-1.5 pl-3 hover-bg-primary/10 cursor-pointer font-bold"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            <button
                onClick={() => (open ? setOpen(false) : setOpen(true))}
                aria-label="Menu"
                className="sm:hidden"
            >
                {/* Menu Icon SVG */}
                <svg
                    width="21"
                    height="15"
                    viewBox="0 0 21 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="21" height="1.5" rx=".75" fill="#426287" />
                    <rect
                        x="8"
                        y="6"
                        width="13"
                        height="1.5"
                        rx=".75"
                        fill="#426287"
                    />
                    <rect
                        x="6"
                        y="13"
                        width="15"
                        height="1.5"
                        rx=".75"
                        fill="#426287"
                    />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div
                className={`${
                    open ? "flex" : "hidden"
                } absolute top-[60px] left-0 w-full bg-white shadow-sm py-4 flex-col items-center gap-4 px-5 text-sm md:hidden`}
            >
                <NavLink
                    to="/"
                    className="block"
                    onClick={() => setOpen(false)}
                >
                    Home
                </NavLink>
                <NavLink
                    href="/products"
                    className="block"
                    onClick={() => setOpen(false)}
                >
                    All Products
                </NavLink>
                {user && (
                    <NavLink
                        to="/orders"
                        className="block"
                        onClick={() => setOpen(false)}
                    >
                        My Orders
                    </NavLink>
                )}
                <NavLink
                    to="/"
                    className="block"
                    onClick={() => setOpen(false)}
                >
                    Contact
                </NavLink>
                {!user ? (
                    <button
                        onClick={() => {
                            setOpen(false);
                            setShowUserLogin(true);
                        }}
                        className="cursor-pointer px-6 py-2 mt-2 bg-primary  hover:bg-primary-dull transition text-white rounded-lg text-sm"
                    >
                        Login
                    </button>
                ) : (
                    <button
                        onClick={logout}
                        className="cursor-pointer px-6 py-2 mt-2 border-1-primary bg-primary hover:bg-primary-dull transition text-white rounded-lg text-sm"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};
