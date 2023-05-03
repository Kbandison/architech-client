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
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { BsCartPlus, BsCartDash } from "react-icons/bs";

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

  const prod =
    products &&
    products.length > 0 &&
    products.map((product) => {
      return product;
    });

  useEffect(() => {
    const resultArray = prod ? prod : products;

    if (prod || search) {
      switch (search) {
        case "default":
          setSearchResults(prod);
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
          setSearchResults(prod);
          break;
      }
    }
  }, [products, search]);

  const handleSearch = (e) => {
    const search = e.target.value;

    if (search === "") {
      return searchResults[search];
    }

    const resultsArray = prod.filter(
      (product) =>
        product.product.toLowerCase().includes(search.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(search.toLowerCase()) ||
        product.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toString().includes(search)
    );

    return setSearchResults(resultsArray);
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
      <div id="page" className="flex flex-col items-center justify-center">
        <SearchField
          handleSearch={handleSearch}
          results={searchResults}
          setSearch={setSearch}
          search={search}
        />
        <div id="products" className="w-[50%]">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, i) => {
              return (
                <div
                  id="each-product"
                  key={i}
                  className="border-b p-16 relative"
                >
                  {findWish(product.sku) ? (
                    <MdFavorite
                      className="text-red-500 scale-[180%] cursor-pointer absolute right-10 ease-in-out duration-500"
                      onClick={
                        user
                          ? async () => {
                              if (isLoading) {
                                return <Spinner />;
                              }
                              await dispatch(removeFromWishlist(product.sku));
                              await dispatch(getWishlist());
                            }
                          : () => navigate("/login")
                      }
                    />
                  ) : (
                    <MdOutlineFavoriteBorder
                      className="scale-[180%] cursor-pointer absolute right-10 ease-in-out duration-500"
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
                    />
                  )}
                  <div
                    id="product-info-w-img"
                    className="flex justify-evenly items-center"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="w-56 h-36 cursor-pointer"
                      onClick={() => navigate(`/products/${product.sku}`)}
                    />
                    <div id="important-info" className="w-[45%] pl-8">
                      <h3
                        className="mb-2 hover:underline cursor-pointer"
                        onClick={() => navigate(`/products/${product.sku}`)}
                      >
                        {product.product}
                      </h3>
                      <div className="pt-12 w-full flex">
                        <p>
                          <strong className="pr-2">Model: </strong>{" "}
                          {product.modelNumber}
                        </p>
                        <p className="ml-8">
                          <strong className="pr-2">SKU:</strong> {product.sku}
                        </p>
                      </div>
                    </div>
                    <div
                      id="product-info"
                      className="flex flex-col items-center p-6"
                    >
                      {user && user.user.scope !== "customer" ? (
                        <div className="pb-8">
                          <p className="text-md line-through">
                            <strong>Regular Price:</strong> $
                            {Number(product.regularPrice).toLocaleString(
                              "en-US"
                            )}
                          </p>
                          {
                            <p className="text-lg">
                              <strong>Employee Price: </strong> $
                              {Number(product.regularPrice * 0.65)
                                // .toFixed(2)
                                .toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                            </p>
                          }
                        </div>
                      ) : (
                        <div className="pb-8">
                          {product.onSale &&
                            product.salePrice < product.regularPrice && (
                              <h5>
                                SALE! $
                                {Math.ceil(
                                  product.regularPrice - product.salePrice
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}{" "}
                                OFF!
                              </h5>
                            )}
                          <p
                            className={`text-lg ${
                              product.onSale &&
                              product.salePrice < product.regularPrice &&
                              "line-through text-sm"
                            }`}
                          >
                            <strong>Regular Price:</strong> $
                            {Number(product.regularPrice).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </p>
                          {product.onSale &&
                            product.salePrice < product.regularPrice && (
                              <p className="text-lg">
                                <strong>Sale Price: </strong> $
                                {Number(product.salePrice).toLocaleString(
                                  "en-US",
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </p>
                            )}
                        </div>
                      )}
                      {findCart(product.sku) ? (
                        <button
                          className="button w-54 flex gap-2 items-center text-lg"
                          onClick={
                            user
                              ? async () => {
                                  await dispatch(clearItem(product.sku));
                                  await dispatch(getUserCart());
                                }
                              : () => navigate("/login")
                          }
                        >
                          <BsCartDash className="scale-[130%] text-red-500" />{" "}
                          Remove Item
                        </button>
                      ) : (
                        <button
                          className="button w-54 flex gap-2 items-center text-lg"
                          onClick={
                            user
                              ? async () => {
                                  await dispatch(addToCart(product.sku));
                                  await dispatch(getUserCart());
                                }
                              : () => navigate("/login")
                          }
                        >
                          <BsCartPlus className="scale-[130%] text-green-500" />{" "}
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
