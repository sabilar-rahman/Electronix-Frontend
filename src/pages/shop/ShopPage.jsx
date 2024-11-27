import { useGetAllProductsQuery } from "@/redux/featuresApi/products/productsApi";
import ProductsCard from "./ProductsCard";
import { useState } from "react";
import ShopFiltering from "./ShopFiltering";
import Loading from "@/utils/Loading";

const filters = {
    categories: ["All Products", "Motherboard", "CPU", "GPU", "Microphone", "Monitor", "RAM", "Speaker", "SSD", "Thermal Paste"],
    colors: ["All Colors", "black", "white"],
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
        category: "All Products",
        color: "All Colors",
        priceRange: "",
    });

    const { category, color, priceRange } = filterState;


    const clearFilters = () => {
        setFilterState({
            category: "All Products",
            color: "All Colors",
            priceRange: "",
        });
    };

    const [minPrice, maxPrice] = priceRange.split("-").map(Number);


    const {
        data: productsData = {},
        isLoading,
        error,
    } = useGetAllProductsQuery({
        // category: category === "all" ? category : "",
        // color: color === "all" ? color : "",

        category: category === "All Products" ? "" : category, // Fix applied here
        color: color === "All Colors" ? "" : color,         // Fix for color filter too
        minPrice: isNaN(minPrice) ? '' : minPrice,
        maxPrice: isNaN(maxPrice) ? '' : maxPrice,
        page: currentPage,
        limit: productsPerPage,
    });
    //   console.log(productsData);

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <p>Error fetching products!</p>;
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        };
    };




    const products = productsData?.products || [];
    const totalProducts = productsData?.totalProducts || 0;
    const totalPages = productsData?.totalPages || 0;

    console.log(products, totalPages, totalProducts);


    const startProducts = (currentPage - 1) * productsPerPage + 1;

    const endProducts = startProducts + products.length - 1;

    return (
        <div className="container mx-auto">
            <section className="flex flex-col md:flex-row md:gap-12 gap-8">
                {/* catagories and filters */}

                <ShopFiltering
                    filters={filters}
                    filterState={filterState}
                    setFilterState={setFilterState}
                    clearFilters={clearFilters}
                />
                {/* product page */}

                <div>
                    <h1 className="text-xl font-medium">showing{startProducts} to {endProducts} of {totalProducts} products</h1>
                    <ProductsCard products={products} />

                    {/* pagination */}

                    {
                        products.length > 0 &&  <div className="mt-6 flex justify-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200">Previous</button>
                        {
                            [...Array(totalPages)].map((_, index) => (
                                <button onClick={() => handlePageChange(index + 1)}

                                    className={`px-4 py-2 ${currentPage === index + 1 ? "bg-red-200" : "bg-gray-100"}`} key={index}> {index + 1}</button>
                            ))
                        }
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}

                            disabled={currentPage === totalPages}

                            className="px-4 py-2 bg-gray-200">Next</button>
                    </div>
                    }
                   
                </div>
            </section>
        </div>
    );
};

export default ShopPage;
