import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, reset } from "../features/products/productSlice";
import { addToWishlist } from "../features/wishlist/wishSlice";
import { addToCart } from "../features/cart/cartSlice";
import Modal2 from "./Modal2";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [cartModal, setCartModal] = useState(false);
  const [wishModal, setWishModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductssPerPage] = useState(10);

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

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Products</h1>
      <div className="grid grid-cols-2 gap-4">
        {currentProducts.map((product, i) => {
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
                  <button
                    onClick={() => {
                      dispatch(addToWishlist(product.sku));
                      setCartModal(true);
                      setWishModal(true);
                    }}
                    className="button w-44"
                  >
                    {" "}
                    Add to Wishlist
                  </button>
                  <Link to={`/products/${product.sku}`}>
                    <button className="button">View Product</button>
                  </Link>
                  <button
                    className="button w-40 active:cursor-progress"
                    onClick={() => {
                      dispatch(addToCart(product.sku));
                      setCartModal(true);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        products={products}
      />
      <Modal2
        cartOpen={cartModal}
        wishOpen={wishModal}
        onClose={() => {
          setCartModal(false);
          setWishModal(false);
        }}
      />
    </>
  );
};

export default Products;
