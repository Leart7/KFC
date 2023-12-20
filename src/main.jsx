import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/Product.jsx";
import DeliveryPage from "./pages/DeliveryPage.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import RestaurantsPage from "./pages/RestaurantsPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import MyAccountPage from "./pages/MyAccountPage.jsx";
import ConfirmOrderPage from "./pages/ConfirmOrderPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import DeliveryHomePage from "./pages/DeliveryHomePage.jsx";
import DeliveryAddress from "./pages/DeliveryAddress.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/restaurants",
        element: <RestaurantsPage />,
      },
      {
        path: "/delivery/homepage",
        element: <DeliveryHomePage />,
      },
      {
        path: "/search/type/delivery/address",
        element: <DeliveryAddress />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/delivery",
            element: <DeliveryPage />,
          },
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/profile",
            element: <MyAccountPage />,
          },
          {
            path: "/confirm-order",
            element: <ConfirmOrderPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
