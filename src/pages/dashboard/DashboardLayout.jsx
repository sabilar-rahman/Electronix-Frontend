import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case "admin":
        return <AdminDashboard/>;
      case "user":
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-1/5 sm:w-2/5 w-full bg-white shadow-md p-4">
        {renderDashboard()}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white shadow rounded-md p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
