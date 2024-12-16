import { useGetOrdersByEmailQuery } from "@/redux/featuresApi/orders/ordersApi";
import Loading from "@/utils/Loading";
import { useSelector } from "react-redux";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
import { Link } from "react-router-dom";

const UserOrders = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: orderData, isLoading, error } = useGetOrdersByEmailQuery(user?.email);
    const orders = orderData?.orders;

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <h1>No orders</h1>;
    }


    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "text-yellow-500";
            case "completed":
                return "text-green-500";
            case "processing":
                return "text-blue-500";
            default:
                return "text-gray-500";
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>DB ID</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">View Order</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map((order, index) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-medium">INV{index + 1}</TableCell>
                            <TableCell>{order?._id}</TableCell>
                            <TableCell>{order?.orderId}</TableCell>
                            <TableCell>{format(new Date(order?.createdAt), "MM/dd/yyyy")}</TableCell>
                            <TableCell className={getStatusClass(order?.status)}>{order?.status}</TableCell>
                            <TableCell >${order?.amount}</TableCell>
                            <TableCell className="text-right hover:text-red-500">
                                <Link to={`/order/${order?._id}`}>View Order</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserOrders;
