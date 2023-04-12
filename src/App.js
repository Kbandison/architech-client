import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NavBar from "./Pages/Navbar";
import Dashboard from "./Pages/Dashboard";
import ProductList from "./Pages/ProductList";
import WishlistPage from "./Pages/WishlistPage";
import CartPage from "./Pages/CartPage";
import AccountPage from "./Pages/AccountPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ProductPage from "./Pages/ProductPage";
import AccountBar from "./Components/AccountBar";
import OrderHistory from "./Pages/OrderHistory";
import OrdersPage from "./Pages/OrdersPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<NavBar />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route element={<AccountBar />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/orders" element={<OrdersPage />} />
          <Route path="/account/order-history" element={<OrderHistory />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
