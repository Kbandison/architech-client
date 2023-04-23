import { useState, useEffect } from "react";
import { addToCart, clearItem, getUserCart } from "../features/cart/cartSlice";
import {
  removeFromWishlist,
  addToWishlist,
  reset,
  getWishlist,
} from "../features/wishlist/wishSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUserCart());
    dispatch(getWishlist());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const handleAddToCart = async (sku) => {
    if (user) {
      if (isLoading) return <Spinner />;
      await dispatch(addToCart(sku));
      await dispatch(getUserCart());
    } else {
      navigate("/login");
    }
  };

  const handleRemoveFromCart = async (sku) => {
    if (user) {
      if (isLoading) return <Spinner />;
      await dispatch(clearItem(sku));
      await dispatch(getUserCart());
    } else {
      navigate("/login");
    }
  };

  const handleAddToWishlist = async (sku) => {
    if (user) {
      if (isLoading) return <Spinner />;
      await dispatch(addToWishlist(sku));
      await dispatch(getWishlist());
    } else {
      navigate("/login");
    }
  };

  const handleRemoveFromWishlist = async (sku) => {
    if (user) {
      if (isLoading) return <Spinner />;
      await dispatch(removeFromWishlist(sku));
      await dispatch(getWishlist());
    } else {
      navigate("/login");
    }
  };

  const isInCart = (sku) => {
    if (cart && cart.length > 0) {
      return cart.find((item) => item.sku === sku);
    }
  };

  const isInWishlist = (sku) => {
    if (wishlist && wishlist.length > 0) {
      return wishlist.find((item) => item.sku === sku);
    }
  };

  // if (isLoading) return <Spinner />;

  return (
    <div className="2xl:w-[50vw] w-[94vw] p-16 sm:p-4 flex gap-8 text-center items-center justify-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-96 h-56 sm:w-64 sm:h-44"
      />
      <div className="flex flex-col items-center">
        <h2 className="my-14 md:my-8 sm:my-4 sm:text-md w-[30vw] flex justify-center ">
          {product.product}
        </h2>
        {product.onSale && product.salePrice < product.regularPrice && (
          <p>
            SALE! $
            {Math.ceil(product.regularPrice - product.salePrice).toLocaleString(
              "en-US"
            )}{" "}
            OFF!
          </p>
        )}
        <p>
          Regular Price: ${Number(product.regularPrice).toLocaleString("en-US")}
        </p>
        <p>
          {product.onSale &&
            product.salePrice < product.regularPrice &&
            `Sale Price: $${Number(product.salePrice).toLocaleString("en-US")}`}
        </p>
        <div className="my-14 md:my-8 sm:my-4">
          {isInCart(product.sku) ? (
            <button
              onClick={() => handleRemoveFromCart(product.sku)}
              className="button"
            >
              Remove from Cart
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(product.sku)}
              className="button"
            >
              Add to Cart
            </button>
          )}
          <button
            className="button"
            onClick={() => navigate(`/products/${product.sku}`)}
          >
            View Product
          </button>
          {isInWishlist(product.sku) ? (
            <button
              onClick={() => handleRemoveFromWishlist(product.sku)}
              className="button"
            >
              Remove from Wishlist
            </button>
          ) : (
            <button
              onClick={() => handleAddToWishlist(product.sku)}
              className="button"
            >
              Add to Wishlist
            </button>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductCard;
