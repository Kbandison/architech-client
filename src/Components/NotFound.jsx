import React from "react";
import { removeFromWishlist } from "../features/wishlist/wishSlice";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  h-[45vh]">
      <div className=" flex flex-col gap-16 items-center">
        <h1 className="text-center">404!</h1>
        <h2 className="w-[55%] text-center leading-[4rem]">
          Sorry, You've Navigated to a Page that doesn't Exist, or May Not Exist
          Yet! Please Select Another Link!
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
