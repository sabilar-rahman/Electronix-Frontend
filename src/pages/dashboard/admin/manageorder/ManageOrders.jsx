import {
    useDeleteOrderByIdMutation,
    useGetAllOrdersQuery,
    useUpdateOrderStatusMutation,
} from "@/redux/featuresApi/orders/ordersApi";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import Loading from "@/utils/Loading";
import { toast } from "sonner";
import { format } from "date-fns";
import { useState } from "react";

const ManageOrders = () => {
    // const dispatch = useDispatch();
    // another way to update status
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const { data, isLoading} = useGetAllOrdersQuery();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const [deleteOrderById] = useDeleteOrderByIdMutation();

    const order = data?.orders;

    // console.log(order);

    if (isLoading) {
        return <Loading />;
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrderById(orderId).unwrap();
            toast.success("Order deleted successfully.");
            // refetch();
        } catch (error) {
            console.error(error);
        }
    };

    // const handleUpdateOrderStatus = async (orderId, status) => {
    //     try {
    //         await updateOrderStatus({ id: orderId, status }).unwrap();
    //         toast.success("Order status updated successfully.");
    //         refetch();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const handleUpdateOrderStatus = async () => {
        if (!selectedOrder || !newStatus) return;

        try {
            await updateOrderStatus({
                id: selectedOrder,
                status: newStatus,
            }).unwrap();
            toast.success("Order status updated successfully.");
            setSelectedOrder(null); // Close modal
            setNewStatus("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order status.");
        }
    };

    const getStatusColor = (status) => {
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
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your User invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>

                        <TableHead>Email</TableHead>
                        <TableHead>Order Id</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {order?.map((order, index) => (
                        <TableRow key={order._id}>
                            <TableCell className="font-medium">ID-{index + 1}</TableCell>
                            <TableCell>{order?.email}</TableCell>
                            <TableCell>{order?.orderId}</TableCell>
                            <TableCell>{order?.amount}</TableCell>
                            <TableCell>
                                <span className={getStatusColor(order?.status)}>
                                    {order?.status}
                                </span>
                            </TableCell>
                            <TableCell>
                                {" "}
                                {format(new Date(order?.createdAt), "dd-MMM-yyyy")}
                            </TableCell>

                            <TableCell className="flex gap-2">
                                {/* <Button variant="secondary">View</Button> */}
                                {/* <Button variant="outline">
                                    
                                    
                                    
                                    
                                    </Button> */}
                                {/* Status Update */}
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => setSelectedOrder(order._id)}
                                        >
                                            Status Update
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Update Order Status</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Select the new status for the order.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        {/* Dropdown for Status */}
                                        <div className="my-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Order Status
                                            </label>
                                            <select
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value)}
                                                className="w-full p-2 border rounded"
                                            >
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={() => setSelectedOrder(null)}>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction onClick={handleUpdateOrderStatus}>
                                                Save
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                {/* <Button variant="destructive" >


                                    <AlertDialog>
                                        <AlertDialogTrigger>Delete</AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDeleteOrder(order?._id)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </Button> */}

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Delete</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. It will permanently delete
                                                the order.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDeleteOrder(order._id)}
                                            >
                                                Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ManageOrders;
