import { useDispatch } from "react-redux";
import OrderSummary from "./OrderSummary";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/featuresApi/cart/cartSlice";

const CartItems = ({ products }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (type, id) => {
    const payload = { type, id };

    dispatch(updateQuantity(payload));
  };

  const handleRemoveFormCart = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart(id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "100vh" }}>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() =>
                    handleUpdateQuantity("decrement", product?._id)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                  disabled={product?.quantity <= 1}
                >
                  -
                </button>
                <span className="px-2">{product?.quantity}</span>
                <button
                  onClick={() =>
                    handleUpdateQuantity("increment", product?._id)
                  }
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                >
                  +
                </button>
              </div>
              <button
                onClick={(e) => handleRemoveFormCart(e, product?._id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div>
          <OrderSummary />
        </div>{" "}
      </div>
    </div>
  );
};

export default CartItems;
