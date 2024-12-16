import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/orders", label: "Order Truck" },
  { path: "/dashboard/payments", label: "Payments" },
  { path: "/dashboard/reviews", label: "Reviews" },
  { path: "/dashboard/profile", label: "Profile" },
];

const UserDashboard = () => {

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="space-y-6">
      {/* Branding Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-700">Electronix</h1>
        <p className="text-sm text-gray-500">Hello, {user?.name} </p>
      </div>

      <hr className="border-gray-300" />

      {/* Navigation Links */}
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "block bg-red-500 text-white p-3 rounded-md shadow-lg"
                  : "block bg-gray-100 text-gray-700 p-3 rounded-md hover:bg-gray-200"
              }
              end
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
