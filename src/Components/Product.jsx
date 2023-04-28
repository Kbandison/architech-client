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

  const findWish = (sku) => {
    return wishlist.find((wish) => wish.sku === sku);
  };

  const findCart = (sku) => {
    return cart.find((cart) => cart.sku === sku);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className=" flex flex-col items-center">
      <div className="my-32 w-[60%] flex flex-col items-start">
        <div className="flex flex-col gap-4 ">
          <h1>{products.product}</h1>
          <div className="flex gap-8">
            <p className="text-xl">
              <strong className="pr-2">Model #:</strong> {products.modelNumber}
            </p>
            <p className="text-xl">
              <strong className="pr-2">sku:</strong> {products.sku}
            </p>
          </div>
          {products.customerReviewAverage && (
            <div className="flex gap-8">
              <p>
                <strong className="pr-2">Review Avg:</strong>{" "}
                {products.customerReviewAverage}/5
              </p>
              <p>
                <strong className="pr-2">Review Count:</strong>{" "}
                {products.customerReviewCount} reviews
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
            <div className=" mb-72">
              <p
                className={`text-2xl ${
                  products.onSale &&
                  products.salePrice < products.regularPrice &&
                  "line-through text-sm"
                }`}
              >
                <strong>Regular Price:</strong> $
                {Number(products.regularPrice).toLocaleString("en-US")}
              </p>
              {products.onSale &&
                products.salePrice < products.regularPrice && (
                  <>
                    <h3 className="border rounded-md w-28 text-center py-1 my-1">
                      SAVE $
                      {Math.ceil(
                        products.regularPrice - products.salePrice
                      ).toLocaleString("en-US")}{" "}
                    </h3>
                    <p className="text-3xl">
                      <strong>Sale Price: </strong> $
                      {Number(products.salePrice).toLocaleString("en-US")}
                    </p>
                  </>
                )}

              {/* {products.onSale &&
                products.salePrice < products.regularPrice && (
                  
                )} */}
            </div>
            {findCart(products.sku) ? (
              <button
                className="button w-48 h-12 flex gap-2 items-center text-lg"
                onClick={
                  user
                    ? async () => {
                        await dispatch(clearItem(products.sku));
                        await dispatch(getUserCart());
                      }
                    : () => navigate("/login")
                }
              >
                <BsCartDash className="scale-[130%] text-red-500" /> Remove Item
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
