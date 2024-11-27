import { useGetProductByIdQuery } from "@/redux/featuresApi/products/productsApi";
import Loading from "@/utils/Loading";
import { useParams } from "react-router-dom";
import ReviewCard from "../Reviews/ReviewCard";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/featuresApi/cart/cartSlice";
import { ShoppingCart } from "lucide-react";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto text-center py-10">
        <h2 className="text-red-500 text-2xl">
          Failed to load product details. Please try again.
        </h2>
      </div>
    );
  }

  const { product, reviews } = data || {};

  console.log(data);

  const {
    name,
    image,
    description,
    price,
    oldPrice,
    category,
    rating,
    color,
    author,
  } = product || {};


  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
      dispatch(addToCart(product));

  }

  return (
    <div className="container mx-auto p-5">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={image}
            alt={name}
            className="w-full h-auto rounded shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <p className="text-gray-500 mb-2">
            Category: <span className="text-black">{category}</span>
          </p>
          <p className="text-gray-500 mb-2">
            Color: <span className="text-black">{color}</span>
          </p>
          <p className="text-gray-500 mb-4">
            Seller:{" "}
            <span className="text-black">{author?.name || "Unknown"}</span>
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <p className="text-xl font-semibold text-green-600">${price}</p>
            {oldPrice && (
              <p className="text-gray-500 line-through">${oldPrice}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <p className="text-yellow-500 font-semibold">{rating} / 5</p>
            <span className="ml-2 text-gray-500">
              ({reviews.length} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{description}</p>

          {/* Add to Cart Button */}
          <button
          onClick={() => handleAddToCart(product)}
          
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2">
           <ShoppingCart className="w-5 h-5" />
           Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}

      <div className="mt-10">
       

        <ReviewCard productReviews={reviews} />
      </div>
    </div>
  );
};

export default SingleProduct;
