import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../features/wishlist/wishSlice";
import Spinner from "./Spinner";
import { getUserCart, removeFromCart, reset } from "../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUserCart());
    console.log(cart);

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Cart Page</h1>
      {cart.map((item, i) => {
        return (
          <div key={i}>
            <img src={item.image} alt="" />
            <p>{item.product}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
            <button
              onClick={() => {
                dispatch(removeFromCart(item.sku));
              }}
            >
              Remove from Cart
            </button>
          </div>
        );
      })}
      <p>{}</p>
    </div>
  );
};

export default Cart;
