import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ShopPage from "../pages/shop/ShopPage";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";

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
]);

export default router;
