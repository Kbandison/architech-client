import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
// import { HiShoppingCart, HiOutlineShoppingCart } from "react-icons/hi";
// import { MdAccountCircle, MdOutlineAccountCircle } from "react-icons/md";
// import { IoStorefrontSharp, IoStorefrontOutline } from "react-icons/io5";
// import {
//   AiOutlineHome,
//   AiTwotoneHome,
//   AiOutlineHeart,
//   AiTwotoneHeart,
// } from "react-icons/ai";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const NavbarInfo = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav className="flex justify-between items-center text-1xl font-bold text-[#5500a3] p-6">
        {/* <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
          alt=""
          className="h-12 w-14 "
        /> */}
        <h1>ARCHI-TECH.</h1>
        <ul className="md:flex py-4 gap-6 items-center hidden">
          <li className="link">
            <Link to="/dashboard">Home</Link>
          </li>
          <li className="link">
            <Link to="/products">Products</Link>
          </li>
          <li className="link">
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li className="link">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="link">
            <Link to="/my-account">My Account</Link>
          </li>
          <li>
            <button className="button">Sign In</button>
          </li>
        </ul>
        <div onClick={handleNav} className="block md:hidden">
          {nav ? (
            <AiOutlineClose className="h-8 w-8" />
          ) : (
            <AiOutlineMenu className="h-8 w-8" />
          )}
        </div>
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[30%] h-full border-r border-r-gray-900 bg-[#5500a3] ease-in-out duration-500 md:hidden"
              : "fixed left-[-100%]"
          }
        >
          <h1 className="text-white m-8">ARCHI-TECH.</h1>

          <ul className="p-4 uppercase ">
            <li className="link p-4 text-white border-b border-[#ffcc00]">
              <Link to="/dashboard">Home</Link>
            </li>
            <li className="link p-4 text-white border-b border-[#ffcc00]">
              <Link to="/products">Products</Link>
            </li>
            <li className="link p-4 text-white border-b border-[#ffcc00]">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="link p-4 text-white border-b border-[#ffcc00]">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="link p-4 text-white">
              <Link to="/my-account">My Account</Link>
            </li>
            <li>
              <button className="button m-4">Sign In</button>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default NavbarInfo;
