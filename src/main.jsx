import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./pages/ProductPage/Product.jsx";
import DeliveryPage from "./pages/DeliveryPage/DeliveryPage.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage/HomePage.jsx";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage.jsx";
import Signup from "./pages/authentication/Signup.jsx";
import Login from "./pages/authentication/Login.jsx";
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx";
import MyAccountPage from "./pages/MyAccount/MyAccountPage.jsx";
import ConfirmOrderPage from "./pages/ConfirmOrder.jsx/ConfirmOrderPage.jsx";

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
        path: "/delivery",
        element: <DeliveryPage />,
      },
      {
        path: "/restaurants",
        element: <RestaurantsPage />,
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
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
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
