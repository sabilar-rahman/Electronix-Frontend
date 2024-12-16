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

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
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
                            <TableCell>{format(new Date(order?.createdAt), "MM/dd/yyyy")}</TableCell>
                            <TableCell>{order?.status}</TableCell>
                            <TableCell >${order?.amount}</TableCell>
                            <TableCell className="text-right">View Order</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UserOrders;
