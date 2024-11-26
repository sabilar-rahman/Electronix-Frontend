import { useGetAllProductsQuery } from "@/redux/featuresApi/products/productsApi";
import ProductsCard from "./ProductsCard";
import { useState } from "react";

const filters = {
    categories: ["all", "Motherboard", "CPU", "GPU", "Microphone", "Monitor", "RAM", "Speaker", "SSD", "Thermal Paste"],
    colors: ["all", "black", "white"],
    priceRanges: [
        { label: "under $100", min: 0, max: 100 },
        { label: "$100 - $200", min: 100, max: 200 },
        { label: "$200 - $300", min: 200, max: 300 },
        { label: "$300 - $400", min: 300, max: 400 },
        { label: "$400 - $500", min: 400, max: 500 },
        { label: "$500 and above", min: 500, max: Infinity },

    ]

}
const ShopPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const [filterState, setFilterState] = useState({
        category: "all",
        color: "all",
        priceRange: "",
    });

    const { category, color, priceRange } = filterState;

    const [minPrice, maxPrice] = priceRange.split("-").map(Number);


    const {
        data: productsData = {},
        isLoading,
        error,
    } = useGetAllProductsQuery({
        category: category === "all" ? category : "",
        color: color === "all" ? color : "",
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage,
    });
    //   console.log(productsData);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching products!</p>;
    }
    const products = productsData?.products || [];
    const totalProducts = productsData?.totalProducts || 0;
    const totalPages = productsData?.totalPages || 0;

    console.log(products, totalPages, totalProducts);


    const startProducts = (currentPage - 1) * productsPerPage + 1;

    const endProducts = startProducts + products.length - 1;

    return (
        <div className="container mx-auto">
            <section className="flex flex-col md:flex-row md:gap-12 gap-8">
                <div >
                    <h1>left</h1>
                </div>

                <div>
                    <h1 className="text-xl font-medium">showing{startProducts} to {endProducts} of {totalProducts} products</h1>
                    <ProductsCard products={products} />
                </div>
            </section>
        </div>
    );
};

export default ShopPage;
