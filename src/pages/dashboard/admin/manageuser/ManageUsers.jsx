import { useGetUsersQuery } from '@/redux/featuresApi/auth/authApi';
import Loading from '@/utils/Loading';
import { format } from "date-fns";
import { Link } from "react-router-dom";
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


const ManageUsers = () => {

    const { data, isLoading, error, refetch } = useGetUsersQuery();

    const users = data?.data;
    console.log(users);


    if (isLoading) return <Loading />;


    const setColorRole =  (role) => {
        switch (role) {
            case "admin":
                return "text-red-700";
            case "user":
                return "text-green-700";
            default:
                return "text-gray-500";
        }    
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your User invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">User</TableHead>

                        <TableHead>User Name</TableHead>
                        <TableHead>User Role</TableHead>
                        <TableHead>Signup date</TableHead>
                        <TableHead>Edit Or Manage</TableHead>
                        <TableHead >Delete User</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user, index) => (
                        <TableRow key={user._id}>
                            <TableCell className="font-medium">ID-{index + 1}</TableCell>

                            <TableCell>{user.name}</TableCell>
                            <TableCell><span className={setColorRole(user.role)}>{user.role}</span></TableCell>
                            <TableCell >{format(new Date(user?.createdAt), "dd-MMM-yyyy")}</TableCell>
                            <TableCell ><Button>Edit</Button> </TableCell>

                            <TableCell >
                                <Button variant="destructive">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
};

export default ManageUsers;