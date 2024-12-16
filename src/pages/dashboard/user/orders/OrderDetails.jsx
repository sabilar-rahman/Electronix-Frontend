
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

    return (
        <div>

        </div>
    );
};

export default OrderDetails;