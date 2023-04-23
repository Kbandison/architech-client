import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, reset } from "../features/products/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../features/wishlist/wishSlice";
import { addToCart, getUserCart, clearItem } from "../features/cart/cartSlice";
import Modal2 from "./Modal2";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import SearchField from "./SearchField";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  const { user } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

  const [cartModal, setCartModal] = useState(false);
  const [wishModal, setWishModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const [search, setSearch] = useState("default");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    const resultArray = products ? [...products] : products;

    if (products || search) {
      switch (search) {
        case "default":
          setSearchResults(products);
          break;
        case "price-ascending":
          setSearchResults(
            resultArray.sort((a, b) => a.salePrice - b.salePrice)
          );
          break;
        case "price-descending":
          setSearchResults(
            resultArray.sort((a, b) => b.salePrice - a.salePrice)
          );
          break;
        case "name-descending":
          setSearchResults(
            resultArray.sort((a, b) => {
              if (a.product < b.product) {
                return 1;
              }
              if (a.product > b.product) {
                return -1;
              }
              return 0;
            })
          );
          break;
        case "name-ascending":
          setSearchResults(
            resultArray.sort((a, b) => {
              if (a.product < b.product) {
                return -1;
              }
              if (a.product > b.product) {
                return 1;
              }
              return 0;
            })
          );
          break;
        case "sale":
          setSearchResults(
            resultArray.filter((product) => product.onSale === true)
          );
          break;
        default:
          setSearchResults(products);
          break;
      }
    }
  }, [products, search]);

  const handleSearch = (e) => {
    const search = e.target.value;

    if (search === "") {
      return searchResults[search];
    }

    const resultsArray = products.filter(
      (product) =>
        product.product.toLowerCase().includes(search.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(search.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toString().includes(search)
    );

    return setSearchResults(resultsArray);
  };

  const handleSort = (e) => {
    setSearch(e);
    // console.log("Products", search);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    searchResults.length > 0
      ? searchResults.slice(indexOfFirstProduct, indexOfLastProduct)
      : searchResults;

  const findWish = (sku) => {
    return wishlist.find((wish) => wish.sku === sku);
  };

  const findCart = (sku) => {
    return cart.find((cart) => cart.sku === sku);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {/* <h1>Products</h1> */}
      <div className="flex flex-col items-center justify-center">
        <SearchField
          handleSearch={handleSearch}
          results={searchResults}
          sort={handleSort}
          setSearch={setSearch}
          search={search}
        />
        <div className="">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, i) => {
              return (
                <div key={i} className="border ">
                  <div className="flex ">
                    <img src={product.image} alt="" className="" />
                    <div className="flex flex-col justify-start p-6">
                      <h5 className="mb-2 text-xl font-medium ">
                        {product.product}
                      </h5>
                      {product.onSale &&
                        product.salePrice < product.regularPrice && (
                          <p>
                            SALE! $
                            {Math.ceil(
                              product.regularPrice - product.salePrice
                            ).toLocaleString("en-US")}{" "}
                            OFF!
                          </p>
                        )}
                      <p>
                        Regular Price: $
                        {Number(product.regularPrice).toLocaleString("en-US")}
                      </p>
                      <p>
                        {product.onSale &&
                          product.salePrice < product.regularPrice &&
                          `Sale Price: $${Number(
                            product.salePrice
                          ).toLocaleString("en-US")}`}
                      </p>
                      {findWish(product.sku) ? (
                        <button
                          className="button w-44"
                          onClick={
                            user
                              ? async () => {
                                  if (isLoading) {
                                    return <Spinner />;
                                  }
                                  await dispatch(
                                    removeFromWishlist(product.sku)
                                  );
                                  await dispatch(getWishlist());
                                }
                              : () => navigate("/login")
                          }
                        >
                          Remove from Wish
                        </button>
                      ) : (
                        <button
                          className="button w-44"
                          onClick={
                            user
                              ? async () => {
                                  if (isLoading) {
                                    return <Spinner />;
                                  }
                                  await dispatch(addToWishlist(product.sku));
                                  await dispatch(getWishlist());
                                }
                              : () => navigate("/login")
                          }
                        >
                          Add to Wishlist
                        </button>
                      )}
                      <Link to={`/products/${product.sku}`}>
                        <button className="button">View Product</button>
                      </Link>
                      {findCart(product.sku) ? (
                        <button
                          className="button w-44"
                          onClick={
                            user
                              ? async () => {
                                  await dispatch(clearItem(product.sku));
                                  await dispatch(getUserCart());
                                }
                              : () => navigate("/login")
                          }
                        >
                          Remove from Cart
                        </button>
                      ) : (
                        <button
                          className="button w-44"
                          onClick={
                            user
                              ? async () => {
                                  await dispatch(addToCart(product.sku));
                                  await dispatch(getUserCart());
                                }
                              : () => navigate("/login")
                          }
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>No Products found</h3>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        products={searchResults}
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
