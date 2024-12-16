import { useGetOrdersByEmailQuery } from "@/redux/featuresApi/orders/ordersApi";
import Loading from "@/utils/Loading";
import { useSelector } from "react-redux";

const UserPayments = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: orderData, error, isLoading } = useGetOrdersByEmailQuery(user?.email);

    // Ensure orders is always an array
    const orders = Array.isArray(orderData?.orders) ? orderData.orders : [];

    const totalPayment = orders.reduce((acc, order) => acc + order.amount, 0);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <h1 className="text-center text-red-500 text-lg font-semibold">Failed to load orders. Please try again later.</h1>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
           
            <div className=" ">
                <p className="text-lg font-semibold">Total Payments:</p>
                <p className="text-2xl text-green-500 font-bold">${totalPayment.toFixed(2)}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Payment Details:</h2>
            <ul className="space-y-2">
                {orders.map((order) => (
                    <li key={order._id} className="p-4 bg-gray-50 shadow-sm rounded-md border border-gray-200">
                        <p className="text-gray-700">Order ID: <span className="font-semibold">{order._id}</span></p>
                        <p className="text-gray-700">Amount: <span className="font-semibold text-green-500">${order.amount.toFixed(2)}</span></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPayments;
