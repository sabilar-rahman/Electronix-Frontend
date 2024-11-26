const ProductsCard = ({ products }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-primary font-bold mt-2">${product.price}</p>
              <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ProductsCard;
  