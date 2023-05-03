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
import Modal2 from "./Components/Modal2";
import OrderConfirm from "./Components/OrderConfirm";
import AdminNavBar from "./Components/AdminNavBar";
import UserAccounts from "./Components/UserAccounts";
import AdminOrderPage from "./Pages/AdminOrderPage";
import UserOrdersPage from "./Pages/UserOrdersPage";
import NotFoundPage from "./Pages/NotFoundPage";
import AdminOrderHistory from "./Pages/AdminOrderHistory";
import UpdateAccount from "./Components/UpdateAccount";
import FooterPage from "./Pages/FooterPage";
import UserInfoPage from "./Pages/UserInfoPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<FooterPage />}>
        <Route element={<NavBar />}>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
          <Route element={<AccountBar />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/orders" element={<OrdersPage />} />
            <Route path="/account/order-history" element={<OrderHistory />} />
          </Route>
          <Route path="/modal" element={<Modal2 />} />
          <Route path="/update-modal" element={<UpdateAccount />} />
          <Route element={<AdminNavBar />}>
            <Route path="/admin/users" element={<UserAccounts />}>
              <Route path="/admin/users/:id" element={<UserInfoPage />} />
              <Route
                path="/admin/users/orders/:id"
                element={<UserOrdersPage />}
              />
            </Route>
            <Route path="/admin/orders" element={<AdminOrderPage />} />
            <Route path="/admin/history" element={<AdminOrderHistory />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <div className="flex flex-col min-h-[100vh]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
