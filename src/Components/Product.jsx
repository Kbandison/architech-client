import { useSelector, useDispatch } from "react-redux";
import { getItem, reset } from "../features/products/productSlice";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addToCart, clearItem, getUserCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../features/wishlist/wishSlice";
import Modal2 from "./Modal2";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import { IoIosHeartDislike } from "react-icons/io";
import ImageSlider from "./ImageSlider";
import { IoStarSharp, IoStarHalfSharp } from "react-icons/io5";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const [cartModal, setCartModal] = useState(false);
  const [wishModal, setWishModal] = useState(false);

  const [imgCarousel, setImgCarousel] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getItem(id));
    dispatch(getWishlist());
    dispatch(getUserCart());

    return () => {
      dispatch(reset());
    };
  }, [id, dispatch, isError, message]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgCarousel((currentSlide) =>
        products.images && currentSlide === products.images.length - 1
          ? 0
          : currentSlide + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [imgCarousel, products.images]);
  // console.log(products);

  const split = String(products.customerReviewAverage).split(".");

  const starRating = [];

  for (let i = 0; i < split[0]; i++) {
    starRating.push(<IoStarSharp className="text-yellow-500" />);
  }

  if (split[1] >= "5" && split[1] <= "9") {
    starRating.push(<IoStarHalfSharp className="text-yellow-500" />);
  }

  const findWish = (sku) => {
    return wishlist.find((wish) => wish.sku === sku);
  };

  const findCart = (sku) => {
    return cart.find((cart) => cart.sku === sku);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className=" flex flex-col items-center">
      <div className="my-24 w-[60%] flex flex-col items-start">
        <div className="flex flex-col gap-4 ">
          <h1>{products.product}</h1>
          <div className="flex gap-8">
            <p className="text-xl">
              <strong className="pr-2">Model #:</strong> {products.modelNumber}
            </p>
            <p className="text-xl">
              <strong className="pr-2">SKU:</strong> {products.sku}
            </p>
          </div>
          {products.customerReviewAverage && (
            <div className="flex gap-8">
              <p className="flex items-center gap-1">
                <strong className="pr-2">Review Avg:</strong>{" "}
                {starRating.map((star, i) => (
                  <div key={i} className="text-lg">
                    {star}
                  </div>
                ))}
                {products.customerReviewAverage}/5
              </p>
              <p>
                <strong className="pr-2">Review Count:</strong>{" "}
                {Number(products.customerReviewCount).toLocaleString("en-US")}{" "}
                reviews
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-between w-full h-[45vh] p-8">
          <div className="flex flex-col items-center">
            <div className="flex w-[30vw] border h-[40vh] overflow-hidden relative m-8 rounded-lg">
              <img
                src={products.images && products.images[imgCarousel].href}
                alt=""
                className="h-full w-full"
              />
            </div>
            <div className="flex gap-2 justify-center">
              {products.images &&
                products.images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className={`border w-[1vw] h-[.5vh] rounded-full cursor-pointer ${
                        imgCarousel === index ? "bg-black" : "bg-gray-400"
                      }`}
                      onClick={() => setImgCarousel(index)}
                    ></div>
                  );
                })}
            </div>
          </div>
          <div className="flex mt-4 flex-col">
            {user && user.user.scope !== "customer" ? (
              <div className="mb-72">
                <p className="text-xl line-through">
                  <strong>Regular Price:</strong> $
                  {Number(products.regularPrice).toLocaleString("en-US")}
                </p>
                {
                  <p className="text-2xl">
                    <strong>Employee Price: </strong> $
                    {Number(products.regularPrice * 0.65)
                      // .toFixed(2)
                      .toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </p>
                }
              </div>
            ) : (
              <div className=" mb-72">
                {products.onSale &&
                  products.salePrice < products.regularPrice && (
                    <h4>
                      SAVE $
                      {Math.ceil(
                        products.regularPrice - products.salePrice
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </h4>
                  )}
                <p
                  className={`text-2xl ${
                    products.onSale &&
                    products.salePrice < products.regularPrice &&
                    "line-through text-lg"
                  }`}
                >
                  <strong>Regular Price:</strong> $
                  {Number(products.regularPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                {products.onSale &&
                  products.salePrice < products.regularPrice && (
                    <p className="text-2xl">
                      <strong>Sale Price: </strong> $
                      {Number(products.salePrice).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  )}
              </div>
            )}
            <div className="flex flex-col items-end scale-[120%]">
              {findCart(products.sku) ? (
                <button
                  className="button w-48 h-12 flex gap-2 items-center text-md"
                  onClick={
                    user
                      ? async () => {
                          await dispatch(clearItem(products.sku));
                          await dispatch(getUserCart());
                        }
                      : () => navigate("/login")
                  }
                >
                  <BsCartDash className="scale-[130%] text-red-500" /> Remove
                  Item
                </button>
              ) : (
                <button
                  className="button w-48 h-12 flex gap-2 items-center text-lg"
                  onClick={
                    user
                      ? async () => {
                          await dispatch(addToCart(products.sku));
                          await dispatch(getUserCart());
                        }
                      : () => navigate("/login")
                  }
                >
                  <BsCartPlus className="scale-[130%] text-green-500" /> Add to
                  Cart
                </button>
              )}
              {findWish(products.sku) ? (
                <button
                  className="button w-48 text-lg"
                  onClick={
                    user
                      ? async () => {
                          await dispatch(removeFromWishlist(products.sku));
                          await dispatch(getWishlist());
                        }
                      : () => navigate("/login")
                  }
                >
                  Remove Wish
                </button>
              ) : (
                <button
                  className="button w-48 text-lg"
                  onClick={
                    user
                      ? async () => {
                          await dispatch(addToWishlist(products.sku));
                          await dispatch(getWishlist());
                        }
                      : () => navigate("/login")
                  }
                >
                  Add to Wishlist
                </button>
              )}
              <button
                className="button w-48 text-lg"
                onClick={() => navigate("/products")}
              >
                Products Page
              </button>

              {/* </Link> */}
            </div>
          </div>
        </div>
        <div className="mt-32">
          <div className="border rounded-xl w-1/2 p-8">
            <h2 className="text-2xl border-b w-36 my-4 pb-2">Description</h2>
            <p className="text-lg leading-[2.5rem]">
              {products.longDescription}
            </p>
          </div>
        </div>
      </div>
      <div></div>
      <Modal2
        cartOpen={cartModal}
        wishOpen={wishModal}
        onClose={() => {
          setCartModal(false);
          setWishModal(false);
        }}
      />
    </div>
  );
};

export default Product;
