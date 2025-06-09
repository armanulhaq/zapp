import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";

const AllProducts = () => {
    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(
                products.filter((product) =>
                    product.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);
    return (
        <div className="my-4 sm:my-8 px-3 sm:px-6 flex flex-col">
            <div className="flex flex-col items-end w-max">
                <p className="text-xl sm:text-2xl md:text-3xl font-medium">
                    All Products
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6">
                {filteredProducts
                    .filter((product) => product.inStock)
                    .map((product, index) => (
                        <div className="w-full">
                            <ProductCard key={index} product={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default AllProducts;
