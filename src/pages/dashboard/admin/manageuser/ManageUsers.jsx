import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useUpdateUserRoleMutation,
} from "@/redux/featuresApi/auth/authApi";
import Loading from "@/utils/Loading";
import { format } from "date-fns";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const ManageUsers = () => {
    const { data, isLoading, refetch } = useGetUsersQuery();
    const [updateUserRole] = useUpdateUserRoleMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedRole, setSelectedRole] = useState("");

    const users = data?.data;
    console.log(users);

    if (isLoading) return <Loading />;

    const setColorRole = (role) => {
        switch (role) {
            case "admin":
                return "text-red-700";
            case "user":
                return "text-green-700";
            default:
                return "text-gray-500";
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const res = await deleteUser(id).unwrap();
            console.log(res);
            refetch();
            toast.success("User deleted successfully");
        } catch (error) {
            console.error(error);
        }
    };



    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole({ id: userId, role: newRole }).unwrap();
            toast.success(
                "Role updated to " + newRole.toUpperCase() + " successfully."
            );
            refetch();
            setSelectedUserId(null);
            setSelectedRole("");
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error("Failed to update role.");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your User invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">User</TableHead>

                        <TableHead>User Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>User Role</TableHead>
                        <TableHead>Signup date</TableHead>
                        <TableHead>Edit Or Manage</TableHead>
                        <TableHead>Delete User</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
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
                </TableBody>
            </Table>
        </div>
    );
};

export default ManageUsers;
