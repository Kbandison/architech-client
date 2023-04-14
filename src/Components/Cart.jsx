import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import {
  getUserCart,
  addToCart,
  removeFromCart,
  emptyCart,
  reset,
} from "../features/cart/cartSlice";
import { createOrder } from "../features/orders/ordersSlice";
import Modal from "./Modal";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let cartTotal = 0;
  let cartItemTotal = 0;

  let [total, setTotal] = useState(0);

  let [checkoutModal, setCheckoutModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { cart, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  cart.map((item) => {
    return (cartTotal += item.price);
  });

  cart.map((item) => {
    return (cartItemTotal += item.quantity);
  });

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUserCart());

    setTotal();

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message]);

  const refreshPage = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-center mt-20">{user.user.firstName}'s Cart</h1>
      <div className="flex justify-center mt-32">
        <div className="">
          {cart.length > 0 ? (
            cart.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-between border-b mb-6 pb-6"
                >
                  <img src={item.image} alt="" className="w-30 h-24" />
                  <p className="font-bold mx-8">{item.product}</p>
                  <div className="flex flex-col items-center">
                    <p>
                      Price: $
                      {item.price % 1 !== 0
                        ? Number(item.price).toFixed(2)
                        : item.price - 0.01}
                    </p>
                    <p className="m-4">
                      Quantity:{" "}
                      <span
                        className="cursor-pointer font-bold mx-1 button"
                        onClick={() => {
                          refreshPage();
                          dispatch(removeFromCart(item.sku));
                        }}
                      >
                        -
                      </span>{" "}
                      {item.quantity}{" "}
                      <span
                        className="font-bold mx-1 cursor-pointer button"
                        onClick={() => {
                          refreshPage();
                          dispatch(addToCart(item.sku));
                        }}
                      >
                        +
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        refreshPage();
                        dispatch(removeFromCart(item.sku));
                      }}
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
            {cart.length > 0 && `Total items: ${cartItemTotal}`}
          </h4>
          <br />
          <h3 className="text-end font-bold">
            {cart.length > 0 &&
              `Total price: $${cartTotal.toLocaleString("en-US")}`}
          </h3>
          <br />
          {cart.length > 0 && (
            <button
              className="button w-full"
              onClick={() => dispatch(emptyCart())}
            >
              Clear Cart
            </button>
          )}
          <br />
          {cart.length > 0 && (
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
