import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import wishReducer from "../features/wishlist/wishSlice";
import cartReducer from "../features/cart/cartSlice";
import ordersReducer from "../features/orders/ordersSlice";
import userReducer from "../features/users/userSlice";
import historyReducer from "../features/history/historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    wishlist: wishReducer,
    cart: cartReducer,
    orders: ordersReducer,
    users: userReducer,
    history: historyReducer,
  },
});
