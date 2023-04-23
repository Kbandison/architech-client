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
import ProductCard from "../Components/CarouselCard";
import {
  HiOutlineArrowCircleLeft,
  HiOutlineArrowCircleRight,
} from "react-icons/hi";

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
    console.log(mainCarousel);
    console.log(mainCarousel.length);
    console.log("Product Length", random1);
    console.log("Product length - 5", random2);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((currentSlide) =>
        currentSlide === mainCarousel.length - 1 ? 0 : currentSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [mainCarousel.length, carouselIndex]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="">
      <div className=" border m-8 h-[40vh] 2xl:w-[50vw] 2xl:relative 2xl:top-[4vh] 2xl:left-[24vw] rounded-2xl gap-4 items-center overflow-hidden">
        <h2 className=" p-2 text-center  md:m-1 ">
          Randomly Generated Products for You
        </h2>
        <div className="flex mt-8 relative ">
          <div
            className=" absolute z-10 h-[41vh] w-28 rounded-2xl flex justify-center -inset-y-24 hover:bg-black opacity-50 ease-in-out duration-300 cursor-pointer"
            onClick={() =>
              setCarouselIndex((currentSlide) =>
                currentSlide === 0 ? mainCarousel.length - 1 : currentSlide - 1
              )
            }
          >
            <button className="">
              <HiOutlineArrowCircleLeft className="w-8 h-8" />
            </button>
          </div>
          <div
            className="absolute z-10 right-0 h-[41vh] w-28 rounded-2xl flex justify-center -inset-y-24 hover:bg-black opacity-50 ease-in-out duration-300 cursor-pointer"
            onClick={() =>
              setCarouselIndex((currentSlide) =>
                currentSlide === mainCarousel.length - 1 ? 0 : currentSlide + 1
              )
            }
          >
            <button className="">
              <HiOutlineArrowCircleRight className="w-8 h-8" />
            </button>
          </div>

          {mainCarousel &&
            mainCarousel.map((item, i) => (
              <div>
                <div
                  key={i}
                  className=" justify-center transition-transform duration-1000 flex items-center"
                  style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                >
                  <ProductCard product={item} />
                </div>
              </div>
            ))}
          <div className="absolute z-10 mt-96 flex w-full inset-x-0 justify-center">
            {mainCarousel.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full mx-1 cursor-pointer  ${
                  carouselIndex === i ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => setCarouselIndex(i)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <Hero />
    </div>
  );
};

export default Dashboard;
