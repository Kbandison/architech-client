import React from "react";
import Hero from "../Components/Hero";
import {
  addToCart,
  getUserCart,
  clearItem,
  reset,
} from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../features/wishlist/wishSlice";
import { getProducts } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo, useCallback } from "react";
import Spinner from "../Components/Spinner";
import ProductCard from "../Components/ProductCard";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [mainCarousel, setMainCarousel] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProducts());
    dispatch(getWishlist());
    dispatch(getUserCart());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const prod = products && products.length > 0 && products.map((item) => item);

  const random1 = useMemo(() => {
    const min = 1;
    const max = prod.length - 6;
    const random = Math.floor(Math.random() * (max - min) + min);

    if (random < 0) {
      return 1;
    } else {
      return random;
    }
  }, [prod.length]);

  const random2 = random1 + 5;

  useEffect(() => {
    prod && setMainCarousel(prod.sort().slice(random1, random2));
    // console.log(itemCarousel);
    console.log("Product Length", random1);
    console.log("Product length - 5", random2);
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="border ">
      <div className="border flex h-1/2">
        {mainCarousel &&
          mainCarousel.map((item, i) => (
            <div key={i} className="">
              <ProductCard product={item} />
            </div>
          ))}
      </div>
      <Hero />
    </div>
  );
};

export default Dashboard;
