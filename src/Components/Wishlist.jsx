import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
  reset,
} from "../features/wishlist/wishSlice";
import { logoutUser } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { addToCart, clearItem, getUserCart } from "../features/cart/cartSlice";
import Pagination from "./Pagination";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { IoIosHeartDislike } from "react-icons/io";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { wishlist, isLoading, isError, message } = useSelector(
    (state) => state.wishlist
  );
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [wishesPerPage] = useState(10);

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
  }, [dispatch, isError, message, navigate]);

  let reversedWishes = wishlist && [...wishlist].reverse();

  const indexOfLastWish = currentPage * wishesPerPage;
  const indexOfFirstWish = indexOfLastWish - wishesPerPage;
  const currentWishes = reversedWishes.slice(indexOfFirstWish, indexOfLastWish);

  const findCart = (sku) => {
    return cart.find((cart) => cart.sku === sku);
  };

  const handleAddCart = async (sku) => {
    await dispatch(addToCart(sku));
    // await dispatch(removeFromWishlist(sku));
    await dispatch(getUserCart());
  };

  const handleRemoveCart = async (sku) => {
    await dispatch(clearItem(sku));
    await dispatch(getUserCart());
  };

  const handleRemoveWish = async (sku) => {
    await dispatch(removeFromWishlist(sku));
    await dispatch(getWishlist());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="pt-16">
      <h1 className="text-center">{user.user.firstName}'s Wishes</h1>
      <div className="  grid grid-cols-2 content-center">
        {currentWishes.length > 0 ? (
          currentWishes.map((item, i) => {
            return (
              <div key={i} className="border-b m-8 py-8 flex justify-evenly">
                <img
                  src={item.image}
                  alt=""
                  className="w-96 h-56 cursor-pointer"
                  onClick={() => navigate(`/products/${item.sku}`)}
                />
                <div className=" w-[50%] flex flex-col items-center p-8 gap-8">
                  <h4
                    onClick={() => navigate(`/products/${item.sku}`)}
                    className="cursor-pointer hover:underline"
                  >
                    {item.product}
                  </h4>
                  <p className="text-xl">
                    <strong>Price:</strong> $
                    {Number(item.price).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <div className=" flex flex-col items-center gap-1">
                    {findCart(item.sku) ? (
                      <button
                        className="button w-54 flex gap-2 items-center text-lg"
                        onClick={() => handleRemoveCart(item.sku)}
                      >
                        <BsCartDash className="scale-[130%] text-red-500" />{" "}
                        <strong>Remove Item</strong>
                      </button>
                    ) : (
                      <button
                        className="button w-54 flex gap-2 items-center text-lg"
                        onClick={() => handleAddCart(item.sku)}
                      >
                        <BsCartPlus className="scale-[130%] text-green-500" />{" "}
                        <strong>Add to Cart</strong>
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveWish(item.sku)}
                      className="button  w-54 flex gap-2 items-center text-lg"
                    >
                      {" "}
                      <IoIosHeartDislike className="scale-[150%] text-red-500" />
                      <strong>Remove Wish</strong>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="text-center mt-96 pt-4">Wishlist is empty</h2>
        )}
      </div>
      {wishlist.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={wishesPerPage}
          products={wishlist}
        />
      )}
    </div>
  );
};

export default Wishlist;
