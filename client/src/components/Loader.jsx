import React from "react";

const Loader = ({ context = "default" }) => {
    const messageSets = {
        userOrders: [
            "Finding your orders... 📦",
            "Loading order details... 📋",
            "Retrieving orders... 🔄",
            "Almost there... ⏳",
            "Just a moment... ⚡",
        ],
        sellerOrders: [
            "Finding orders... 📦",
            "Loading order details... 📋",
            "Retrieving orders... 🔄",
            "Almost there... ⏳",
            "Just a moment... ⚡",
        ],
        products: [
            "Loading products... 🛒",
            "Finding the best deals... 🔍",
            "Almost there... ⏳",
            "Just a moment... ⚡",
        ],
        cart: [
            "Updating your cart... 🛒",
            "Almost there... ⏳",
            "Just a moment... ⚡",
        ],
        checkout: [
            "Processing your order... 💳",
            "Almost there... ⏳",
            "Just a moment... ⚡",
        ],
        default: ["Loading... 🔄", "Almost there... ⏳", "Just a moment... ⚡"],
    };

    const messages = messageSets[context] || messageSets.default;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground animate-pulse">
                {randomMessage}
            </p>
        </div>
    );
};

export default Loader;
