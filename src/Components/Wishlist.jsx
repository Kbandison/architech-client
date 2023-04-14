import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
  reset,
} from "../features/wishlist/wishSlice";
import Spinner from "./Spinner";
import { addToCart } from "../features/cart/cartSlice";
import Modal2 from "./Modal2";
import Pagination from "./Pagination";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist, isLoading, isError, message } = useSelector(
    (state) => state.wishlist
  );

  const [cartModal, setCartModal] = useState(false);
  const [RemoveWishModal, setRemoveWishModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [wishesPerPage, setWishesPerPage] = useState(5);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getWishlist());
    console.log(wishlist);

    return () => {
      dispatch(reset());
    };
  }, [cartModal, dispatch, isError, message]);

  const indexOfLastWish = currentPage * wishesPerPage;
  const indexOfFirstWish = indexOfLastWish - wishesPerPage;
  const currentWishes = wishlist.slice(indexOfFirstWish, indexOfLastWish);

  const refreshPage = () => {
    window.location.reload();
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
              <p>Price: ${item.price}</p>
              <button
                onClick={() => {
                  dispatch(addToCart(item.sku));
                  dispatch(removeFromWishlist(item.sku));
                  setCartModal(true);
                }}
                className="button"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  setCartModal(true);
                  setRemoveWishModal(true);
                  dispatch(removeFromWishlist(item.sku));
                  dispatch(reset());
                }}
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
