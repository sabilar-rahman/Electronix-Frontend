import { clearCart } from "@/redux/featuresApi/cart/cartSlice";
import { getBaseURL } from "@/utils/getBaseURL";
import { loadStripe } from "@stripe/stripe-js";


import { useDispatch, useSelector } from "react-redux";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { products, selectedItems, totalPrice } = useSelector(
    (state) => state.cart
  );


  const handleClearCart = () => {
    dispatch(clearCart());
  };

  //   make payment

  const makePayment = async () => {
    // const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    const stripe = await loadStripe(
      "pk_test_51QQ0FdCBNb0TvzzS5nwOzdS56EW0RdcyiOvmMt0d2sVXmEUny8EQ3pRoY6rB9Pzl2sa3VS0sIgg5pqbTAkGSMI4000m7qgb4Ke"
    );
   
    const body = {
      products: products,
      userId: user?._id,
    };

    console.log(body);


    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(`http://localhost:5000/api/orders/create-checkout-session`,{
      method: "POST",
      headers:headers,
      body: JSON.stringify(body)

    })


    const session = await response.json();

    const result = stripe.redirectToCheckout({
      // sessionId: response.data.id,
      //  sessionId: session.data.id,
      sessionId: session.id
    });
    
    if(result.error){
      console.log(result.error.message);
    }

   
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Order Summary
      </h2>

      {/* Products List */}
      {products && products.length > 0 ? (
        <div className="mb-4 space-y-2">
          {products.map((product) => (
            <div key={product._id} className="flex justify-between text-sm">
              <span className="text-gray-700">{product.name}</span>
              <span className="text-gray-500">
                {product.quantity} × ${product.price}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty</p>
      )}

      {/* Selected Items Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Selected Items:{" "}
          <span className="font-medium">{selectedItems.length}</span>
        </p>
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center border-t pt-4">
        <span className="font-semibold text-gray-700">Total Price:</span>
        <span className="font-bold text-lg text-gray-800">
          ${totalPrice.toFixed(2)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-4">
        <button
          onClick={handleClearCart}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          disabled={products.length === 0}
        >
          Clear Cart
        </button>
        <button
          onClick={makePayment}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          // disabled={products.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
