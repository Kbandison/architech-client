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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<NavBar />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
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
