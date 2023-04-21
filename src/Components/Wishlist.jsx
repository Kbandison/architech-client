import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
  reset,
} from "../features/wishlist/wishSlice";
import { logoutUser } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { addToCart, clearItem, getUserCart } from "../features/cart/cartSlice";
import Modal2 from "./Modal2";
import Pagination from "./Pagination";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlist, isLoading, isError, message } = useSelector(
    (state) => state.wishlist
  );
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [cartModal, setCartModal] = useState(false);
  const [RemoveWishModal, setRemoveWishModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [wishesPerPage, setWishesPerPage] = useState(5);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (message && message.includes("Token has expired!")) {
      dispatch(logoutUser());
      navigate("/login");
    }

    dispatch(getWishlist());
    dispatch(getUserCart());

    return () => {
      dispatch(reset());
    };
  }, [cartModal, dispatch, isError, message, navigate]);

  let reversedWishes = [...wishlist].reverse();

  const indexOfLastWish = currentPage * wishesPerPage;
  const indexOfFirstWish = indexOfLastWish - wishesPerPage;
  const currentWishes = reversedWishes.slice(indexOfFirstWish, indexOfLastWish);

  const findCart = (sku) => {
    return cart.find((cart) => cart.sku === sku);
  };

  const handleAddCart = async (sku) => {
    await dispatch(addToCart(sku));
    await dispatch(removeFromWishlist(sku));
    await dispatch(getWishlist());
    // setCartModal(true);
  };

  const handleRemoveWish = async (sku) => {
    await dispatch(removeFromWishlist(sku));
    await dispatch(getWishlist());
    // setRemoveWishModal(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Wishlist Page</h1>

      {currentWishes.length > 0 ? (
        currentWishes.map((item, i) => {
          return (
            <div key={i}>
              <img src={item.image} alt="" />
              <p>{item.product}</p>
              <p>Price: ${Number(item.price).toLocaleString("en-US")}</p>
              {findCart(item.sku) ? (
                <button
                  className="button w-44"
                  onClick={
                    user
                      ? async () => {
                          await dispatch(clearItem(item.sku));
                          await dispatch(getUserCart());
                        }
                      : () => navigate("/login")
                  }
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="button w-44"
                  onClick={
                    user
                      ? async () => {
                          await dispatch(addToCart(item.sku));
                          await dispatch(getUserCart());
                        }
                      : () => navigate("/login")
                  }
                >
                  Add to Cart
                </button>
              )}
              <button
                onClick={() => handleRemoveWish(item.sku)}
                className="button"
              >
                Remove Wish
              </button>
            </div>
          );
        })
      ) : (
        <h2 className="text-center mt-96 pt-4">Wishlist is empty</h2>
      )}
      {wishlist.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={wishesPerPage}
          products={wishlist}
        />
      )}
      <Modal2
        cartOpen={cartModal}
        removeWish={RemoveWishModal}
        onClose={() => {
          setCartModal(false);
        }}
      />
    </div>
  );
};

export default Wishlist;
