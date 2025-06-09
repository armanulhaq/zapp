import React from "react";
import { ProductCard } from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
    const { products } = useAppContext();
    return (
        <div className="my-4 sm:my-8 px-3 sm:px-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-medium">
                Best Sellers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
                {products
                    .filter((product) => product.inStock)
                    .slice(0, 10)
                    .map((product, index) => (
                        <div className="w-full">
                            <ProductCard key={index} product={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BestSeller;
