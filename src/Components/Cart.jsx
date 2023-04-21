import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memorizedCart } from "./Selector";
import Spinner from "./Spinner";
import {
  getUserCart,
  addToCart,
  removeFromCart,
  clearItem,
  emptyCart,
  reset,
} from "../features/cart/cartSlice";
import { createOrder } from "../features/orders/ordersSlice";
import Modal from "./Modal";
import { logoutUser } from "../features/auth/authSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let cartTotal = 0;
  let cartItemTotal = 0;

  let [checkoutModal, setCheckoutModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cart, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  cart &&
    cart.length > 0 &&
    cart.forEach((item) => {
      cartTotal += item.price;
      cartItemTotal += item.quantity;
    });

  // cart.map((item) => {});

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (message.includes("Token has expired!")) {
      dispatch(logoutUser());
      navigate("/login");
    }

    dispatch(getUserCart());

    return () => {
      dispatch(reset());
    };
  }, [checkoutModal, isError, message, navigate, dispatch]);

  const handleAddToCart = async (sku) => {
    await dispatch(addToCart(sku));
    await dispatch(getUserCart());
  };

  const handleRemoveFromCart = async (sku) => {
    await dispatch(removeFromCart(sku));
    await dispatch(getUserCart());
  };

  const handleClearFromCart = async (sku) => {
    await dispatch(clearItem(sku));
    await dispatch(getUserCart());
  };

  const reversedCart = [...cart].reverse();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-center mt-20">{user.user.firstName}'s Cart</h1>
      <div className="flex justify-center mt-32">
        <div className="">
          {reversedCart.length > 0 ? (
            reversedCart.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between border-b mb-6 pb-6"
                >
                  <img src={item.image} alt="" className="w-30 h-24" />
                  <p className="font-bold mx-8">{item.product}</p>
                  <div className="flex flex-col items-center">
                    {item.regularPrice > item.salePrice && <p>SALE!</p>}
                    <p>
                      Price: $
                      {item.price % 1 !== 0
                        ? Number(item.price).toLocaleString("en-US")
                        : (item.price - 0.01).toLocaleString("en-US")}
                    </p>
                    <p className="m-4">
                      Quantity:{" "}
                      <span
                        className="cursor-pointer font-bold mx-1 button"
                        onClick={() => handleRemoveFromCart(item.sku)}
                      >
                        -
                      </span>{" "}
                      {item.quantity}{" "}
                      <span
                        className="font-bold mx-1 cursor-pointer button"
                        onClick={() => handleAddToCart(item.sku)}
                      >
                        +
                      </span>
                    </p>
                    <button
                      onClick={() => handleClearFromCart(item.sku)}
                      className="button h-10"
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="text-center mt-64">Cart is empty</h3>
          )}
          <h4 className="text-end font-bold">
            {reversedCart.length > 0 && `Total items: ${cartItemTotal}`}
          </h4>
          <br />
          <h3 className="text-end font-bold">
            {reversedCart.length > 0 &&
              `Total price: $${cartTotal.toLocaleString("en-US")}`}
          </h3>
          <br />
          {reversedCart.length > 0 && (
            <button
              className="button w-full"
              onClick={() => dispatch(emptyCart())}
            >
              Clear Cart
            </button>
          )}
          <br />
          {reversedCart.length > 0 && (
            <button
              className="button w-full"
              onClick={() => {
                dispatch(createOrder());
                setCheckoutModal(true);
              }}
            >
              Checkout
            </button>
          )}
          <br />
        </div>
        <Modal open={checkoutModal} onClose={() => setCheckoutModal(false)} />
      </div>
    </div>
  );
};

export default Cart;
