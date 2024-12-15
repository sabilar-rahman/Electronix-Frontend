import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const DashboardLayout = () => {

    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />
    }

    const renderDashboard = () => {
        switch (user?.role) {
            case "admin":
                return <div>admin dashboard</div>
            case "user":
                return <div>user dashboard</div>
            default:
                return <Navigate to="/login" replace />
        }
    }
    return (
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
            <header className="lg:w-1/5 sm:2/5 w-full border">Header</header>

            {renderDashboard()}

            <main className="p-8 w-full border mt-4"></main>

            <Outlet />

        </div>

    );
};

export default DashboardLayout;