import axios from "axios";

import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");
    console.log(sessionId);

    if (sessionId) {

      fetch(`http://localhost:5000/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId })
      })
        .then((res) => res.json())
        .then((data) => setOrder(data.order))
        .catch((err) => console.error("Error confirm payment",err))


    }
  }, []);

  console.log(order);
  return (
    <div>
      <h1>Payment Success</h1>
    </div>
  );
};

export default PaymentSuccess;
