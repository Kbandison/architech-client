import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../features/auth/authSlice";
import { getUserCart } from "../features/cart/cartSlice";
import { getWishlist } from "../features/wishlist/wishSlice";

const NavbarInfo = () => {
  const [nav, setNav] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   dispatch(getUserCart());
  //   dispatch(getWishlist());

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (user || isLoggedIn) {
      console.log("logged in", isLoggedIn);
      const timeout = setTimeout(() => {
        setIsLoggedIn((prevState) => prevState === false);
        dispatch(logoutUser());
        navigate("/login");
      }, 900000);
      return () => {
        clearTimeout(timeout);
        console.log("timeout cleared");
      };
    }
  }, [user, isLoggedIn, dispatch, navigate]);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/login");
  };

  const cartCount = useRef(0);

  useEffect(() => {
    if (cart) {
      cartCount.current = cart.length;
    }
  }, [cart, dispatch]);

  return (
    <>
      <nav className="flex justify-between items-center text-1xl font-bold p-6">
        {/* <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          alt=""
          className="h-12 w-14 "
        /> */}
        <h1>
          <Link to="/" className="link">
            ARCHI-TECH.
          </Link>
        </h1>
        <ul className="md:flex py-4 gap-6 items-center hidden">
          <li className="link hover:-translate-y-2">
            <Link to="/">Home</Link>
          </li>
          <li className="link hover:-translate-y-2">
            <Link to="/products">Products</Link>
          </li>
          <li className="link hover:-translate-y-2">
            <Link to={user ? "/wishlist" : "/login"}>Wishlist</Link>
          </li>
          <li className="link hover:-translate-y-2">
            <Link to={user ? "/cart" : "/login"}>
              Cart {user && cart && `(${cartCount.current})`}
            </Link>
          </li>
          <li className="link hover:-translate-y-2">
            <Link to={user ? "/account" : "/login"}>My Account</Link>
          </li>
          {user && user.user.scope === "admin" && (
            <li className="link hover:-translate-y-2">
              <Link to="/admin/users">ADMIN</Link>
            </li>
          )}
          <li className=" text-xl link hover:bg-[#DE3C4B] hover:text-[#E4FDE1] py-1 px-6 rounded-lg">
            {user ? (
              <Link to="/login">
                <button onClick={handleLogout}>Sign Out</button>
              </Link>
            ) : (
              <Link to="/login">
                Sign In{" "}
                <BsArrowRightShort className="inline text-3xl hover:translate-x-4 ease-in-out duration-300" />
              </Link>
            )}
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? (
            <AiOutlineClose className="h-8 w-8" />
          ) : (
            <AiOutlineMenu className="h-8 w-8" />
          )}
        </div>
        {/******************* Sidebar ********************/}
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[40%] h-full border-r border-r-gray-900 bg-[#A4BEF3] ease-in-out duration-500 md:hidden"
              : "fixed left-[-100%]"
          }
        >
          <h1 className="text-white m-8">ARCHI-TECH.</h1>

          <ul className="p-4 uppercase ">
            <li
              className="link p-4 text-[#1C2321] border-b border-[#1C2321]"
              onClick={handleNav}
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="link p-4 text-[#1C2321] border-b border-[#1C2321]"
              onClick={handleNav}
            >
              <Link to="/products">Products</Link>
            </li>
            <li
              className="link p-4 text-[#1C2321] border-b border-[#1C2321]"
              onClick={handleNav}
            >
              <Link to={user ? "/wishlist" : "/login"}>Wishlist</Link>
            </li>
            <li
              className="link p-4 text-[#1C2321] border-b border-[#1C2321]"
              onClick={handleNav}
            >
              <Link to={user ? "/cart" : "/login"}>Cart</Link>
            </li>
            <li
              className="link p-4 text-[#1C2321] border-b border-[#1C2321]"
              onClick={handleNav}
            >
              <Link to={user ? "/account" : "/login"}>My Account</Link>
            </li>
            {user && user.user.scope === "admin" && (
              <li className="link text-[#1C2321] p-4" onClick={handleNav}>
                <Link to="/admin/users">ADMIN</Link>
              </li>
            )}
            <li
              className="text-xl hover:text-[#E4FDE1] text-[#DE3C4B] hover:bg-[#DE3C4B] button flex justify-center ease-in-out duration-300 py-0 mt-4"
              onClick={handleNav}
            >
              {user ? (
                <button onClick={handleLogout} className="m-4">
                  Sign Out
                </button>
              ) : (
                <Link to="/login">
                  <button className="  m-4">
                    Sign In{" "}
                    <BsArrowRightShort className="inline text-3xl hover:translate-x-4 ease-in-out duration-300" />
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Outlet context={setIsLoggedIn} />
    </>
  );
};

export default NavbarInfo;
