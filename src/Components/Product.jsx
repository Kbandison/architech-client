import { useSelector, useDispatch } from "react-redux";
import { getItem, reset } from "../features/products/productSlice";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishSlice";
import Modal2 from "./Modal2";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const [cartModal, setCartModal] = useState(false);
  const [wishModal, setWishModal] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getItem(id));

    return () => {
      dispatch(reset());
    };
  }, [id, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="">
        <h1>{products.product}</h1>
        <div className="flex gap-4">
          <p>Model #: {products.modelNumber}</p>
          <p>sku: {products.sku}</p>
        </div>
        <div>
          <p>Review Avg: {products.customerReviewAverage}</p>
          <p>Review Count: {products.customerReviewCount}</p>
        </div>
        <div>
          {products.onSale && products.salePrice < products.regularPrice && (
            <p>
              SALE! ${Math.ceil(products.regularPrice - products.salePrice)}{" "}
              OFF!
            </p>
          )}
          <p>Regular Price: ${products.regularPrice}</p>
        </div>
        <img src={products.image} alt="" />
      </div>
      <div>
        <button
          className="button"
          onClick={() => {
            dispatch(addToCart(id));
            setCartModal(true);
          }}
        >
          Add to Cart
        </button>
        <button
          className="button"
          onClick={() => {
            dispatch(addToWishlist(id));
            setCartModal(true);
            setWishModal(true);
          }}
        >
          Add to Wishlist
        </button>
        <Link to="/products" className="button">
          Back to Products
        </Link>
      </div>
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
