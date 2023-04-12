import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
  reset,
} from "../features/wishlist/wishSlice";
import Spinner from "./Spinner";
import { addToCart } from "../features/cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, isLoading, isError, message } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getWishlist());
    console.log(wishlist);

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Wishlist Page</h1>

      {wishlist.map((item, i) => {
        return (
          <div key={i}>
            <img src={item.image} alt="" />
            <p>{item.product}</p>
            <p>{item.price}</p>
            <button
              onClick={() => {
                dispatch(addToCart(item.sku));
                dispatch(removeFromWishlist(item.sku));
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                dispatch(removeFromWishlist(item.sku));
              }}
            >
              Remove Wish
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlist;
