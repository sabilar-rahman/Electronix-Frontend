import {
  createBrowserRouter,

} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ShopPage from "../pages/shop/ShopPage";

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
        element:<ShopPage/>
      }
    ],
  },
]);


export default router;