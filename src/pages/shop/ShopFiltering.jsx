import { Button } from "@/components/ui/button";


const ShopFiltering = ({ filters, filterState, setFilterState, clearFilters }) => {
    return (
        <div className="space-y-4 flex-shrink-0">
            <h3>Filters</h3>

            <div className="flex flex-col space-y-2">
                <h4 className="text-lg">Category Filter</h4>

                <hr />
                {
                    filters.categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={filterState.category === category}
                                onChange={(e) => setFilterState({ ...filterState, category: e.target.value })}
                            />
                            <span className="text-sm">{category}</span>

                        </label>
                    ))
                }
            </div>


            <div className="flex flex-col space-y-2">
                <h4 className="text-lg">Color Filter</h4>

                <hr />
                {
                    filters.colors.map((color) => (
                        <label key={color} className="flex items-center space-x-2 cursor-pointer capitalize">
                            <input
                                type="radio"
                                name="color"
                                value={color}
                                checked={filterState.color === color}
                                onChange={(e) => setFilterState({ ...filterState, color: e.target.value })}
                            />
                            <span className="text-sm">{color}</span>

                        </label>
                    ))
                }
            </div>
            <div className="flex flex-col space-y-2">
                <h4 className="text-lg">Price Range</h4>

                <hr />
                {
                    filters.priceRanges.map((range) => (
                        <label key={range} className="flex items-center space-x-2 cursor-pointer capitalize">
                            <input
                                type="radio"
                                name="priceRange"
                                value={`${range.min}-${range.max}`}
                                checked={filterState.priceRange === `${range.min}-${range.max}`}
                                onChange={(e) => setFilterState({ ...filterState, priceRange: e.target.value })}
                            />
                            <span className="text-sm">{range.label}</span>

                        </label>
                    ))
                }
            </div>

            {/* clear filter */}

            <Button variant="destructive" className="w-full hover:bg-red-600" onClick={clearFilters}>Clear Filters</Button>

        </div>
    );
};

export default ShopFiltering;