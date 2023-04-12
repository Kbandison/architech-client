import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, reset } from "../features/products/productSlice";
import { addToWishlist } from "../features/wishlist/wishSlice";
import Spinner from "./Spinner";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  console.log(user);

  // const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProducts());
    console.log(products);

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  const handleAddToWishList = (product) => {
    dispatch(addToWishlist(product));
    navigate("/wishlist");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product, i) => {
          return (
            <div
              key={i}
              className="flex flex-col rounded-lg bg-white shadow-lg dark:bg-neutral-700 md:max-w-xl md:flex-row"
            >
              <div className="flex justify-center">
                <img
                  src={product.image}
                  alt=""
                  className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                />
                <div className="flex flex-col justify-start p-6">
                  <h5 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                    {product.manufacturer} {product.name}
                  </h5>
                  {product.onSale &&
                    product.salePrice < product.regularPrice && (
                      <p>
                        SALE! $
                        {Math.ceil(product.regularPrice - product.salePrice)}{" "}
                        OFF!
                      </p>
                    )}
                  <p>Regular Price: ${product.regularPrice}</p>
                  <p>
                    {product.onSale &&
                      product.salePrice < product.regularPrice &&
                      `Sale Price: $${product.salePrice}`}
                  </p>
                  {/* <p>{product.onSale && `Sale Price: $${product.salePrice}`}</p> */}
                  {/* <Link to="/wishlist"> */}
                  <button
                    onClick={() => {
                      dispatch(addToWishlist(product.sku));
                      dispatch(reset());
                    }}
                    className="button"
                  >
                    {" "}
                    Add to Wishlist
                  </button>
                  {/* </Link> */}
                  <Link to={`/products/${product.sku}`}>
                    <button className="button">View Product</button>
                  </Link>
                  <Link to="/cart">
                    <button className="button">Add to Cart</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
