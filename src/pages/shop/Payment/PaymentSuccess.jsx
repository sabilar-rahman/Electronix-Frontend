import axios from "axios";

import { useEffect, useState } from "react";
import TimelineSteps from "./TimelineSteps";


const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      fetch(`http://localhost:5000/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      })
        .then((res) => res.json())
        .then((data) => setOrder(data.order))
        .catch((err) => console.error("Error confirming payment", err));
    }
  }, []);

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => {
    return status === order.status;
  };

  const steps = [
    {
      status: "pending",
      title: "Pending",
      description: "Your payment is being processed",
    },
    {
      status: "processing",
      title: "Processing",
      description: "Your payment is being processed",
    },
    {
      status: "shipped",
      title: "Shipped",
      description: "Your payment is being processed",
    },
    {
      status: "completed",
      title: "Completed",
      description: "Your payment is being processed",
    },
  ];

  if (!order) {
    return (
      <div className="container mx-auto">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2>Order Status: {order.status}</h2>
      <h2>Order ID: {order.orderId}</h2>

      <ol className="sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimelineSteps
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            description={step.description}
          />
        ))}
      </ol>
    </div>
  );
};

export default PaymentSuccess;
