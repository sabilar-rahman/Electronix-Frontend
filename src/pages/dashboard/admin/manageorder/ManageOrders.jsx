import { useDeleteOrderByIdMutation, useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '@/redux/featuresApi/orders/ordersApi';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import Loading from '@/utils/Loading';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

const ManageOrders = () => {
    const dispatch = useDispatch();
    const { data, isLoading, isError } = useGetAllOrdersQuery();
    const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

    const [deleteOrderById ,{refetch}] = useDeleteOrderByIdMutation();

    const order = data?.orders;

    // console.log(order);

    if (isLoading) {
        return <Loading />
    }

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrderById(orderId).unwrap();
            refetch();
            toast.success("Order deleted successfully.");           
        } catch (error) {
            console.error(error);   
        }

    }



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
                            <TableCell><span className={getStatusColor(order?.status)}>{order?.status}</span></TableCell>
                            <TableCell> {format(new Date(order?.createdAt), "dd-MMM-yyyy")}</TableCell>

                            <TableCell className="flex gap-2">
                                <Button variant="secondary">View</Button>
                                <Button variant="outline">Status update</Button>
                                <Button variant="destructive" onClick={() => handleDeleteOrder(order?._id)}>Delete</Button>

                            </TableCell>
                        </TableRow>
                    ))}


                </TableBody>


                {/* <TableBody>
                                {users?.map((user, index) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="font-medium">ID-{index + 1}</TableCell>
            
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <span className={setColorRole(user.role)}>{user.role}</span>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(user?.createdAt), "dd-MMM-yyyy")}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <select
                                                value={selectedUserId === user._id ? selectedRole : user.role}
                                                onChange={(e) => {
                                                    setSelectedUserId(user._id); // Keep track of the user
                                                    setSelectedRole(e.target.value); // Set the selected role
                                                }}
                                                className="select select-bordered"
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <Button
                                                className={` text-white ${selectedUserId === user._id
                                                    ? "bg-gradient-to-r from-blue-500  to-purple-600  hover:via-blue-600 hover:to-purple-700"
                                                    : "bg-gray-400 cursor-not-allowed"
                                                    } px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}
                                                onClick={() => handleRoleChange(user._id, selectedRole)}
                                                disabled={selectedUserId !== user._id}
                                            >
                                                Save
                                            </Button>
                                        </TableCell>
            
                                        <TableCell>
                                            <Button
                                                onClick={() => handleDeleteUser(user?._id)}
                                                variant="destructive"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody> */}
            </Table>

        </div>
    );
};

export default ManageOrders;