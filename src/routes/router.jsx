import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ShopPage from "../pages/shop/ShopPage";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import SingleProduct from "@/pages/shop/ProductDetails/SingleProduct";
import PaymentSuccess from "@/pages/shop/Payment/PaymentSuccess";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDashMain from "@/pages/dashboard/user/dashboard/UserDashMain";
import UserOrders from "@/pages/dashboard/user/orders/UserOrders";
import OrderDetails from "@/pages/dashboard/user/orders/OrderDetails";
import UserPayments from "@/pages/dashboard/user/userpayments/UserPayments";
import UserReviews from "@/pages/dashboard/user/userreviews/UserReviews";
import UserProfile from "@/pages/dashboard/user/userprofile/UserProfile";
import AdminDashMain from "@/pages/dashboard/admin/dashboard/AdminDashMain";
import ManageUsers from "@/pages/dashboard/admin/manageuser/ManageUsers";
import ManageOrders from "@/pages/dashboard/admin/manageorder/ManageOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/order/:orderId",
        element: <OrderDetails/>,
      },
      {
        path: "/categories/:categoryName",
        element: <div>category page</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  // dashboard routes status

  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>, //TODO: user private route 
    children: [
      //user routes status

      { path: "", element: <UserDashMain /> },
      { path: "orders", element: <UserOrders/> },
      { path: "payments", element: <UserPayments/> },
      { path: "reviews", element: <UserReviews/> },
      { path: "profile", element: <UserProfile/> },

      //admin routes status
      { path: "admin", 
        element: <PrivateRoute role="admin"> <AdminDashMain/> </PrivateRoute> },
      { path: "add-new-post", 
        element: <PrivateRoute role="admin"> <div>new post</div> </PrivateRoute>  },
      { path: "manage-products",
         element: <PrivateRoute role="admin"> <div>manage main</div> </PrivateRoute>  },
      { path: "update-product/:id",
         element: <PrivateRoute role="admin"> <div>update main</div> </PrivateRoute>   },
      { path: "users", 
        element: <PrivateRoute role="admin"> <ManageUsers/> </PrivateRoute>  },
      { path: "manage-orders", 
        element: <PrivateRoute role="admin"><ManageOrders/> </PrivateRoute>  },
    ]
  },
], {

  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,

  },

}
);

export default router;
