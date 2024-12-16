
import TimelineSteps from '@/pages/shop/Payment/TimelineSteps';
import { useGetOrderByIdQuery } from '@/redux/featuresApi/orders/ordersApi';
import Loading from '@/utils/Loading';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {

    // const user = useSelector((state) => state.auth);
    const { orderId } = useParams()

    const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId);
    console.log(order);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <h1>No orders</h1>;
    }

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

export default OrderDetails;