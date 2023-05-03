import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FooterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100vh]">
      <Outlet />
      <div className=" bg-black bg-opacity-20 w-full absolute mt-[30vh]">
        <div className="flex justify-evenly p-8 ">
          <div>
            <h3 className="mb-2">Home</h3>
            <div className="flex flex-col gap-5">
              <p>Dashboard</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2">Products</h3>
            <div className="flex flex-col gap-5">
              <p>Products</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2">My Account</h3>
            <div className="flex flex-col gap-5">
              <p>Info</p>
              <p>Orders</p>
              <p>Order History</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2">Contact:</h3>
            <div className="flex flex-col gap-5">
              <p>Atlanta, GA, 30303</p>
              <p>support@atadmin.com</p>
              <p>(678)-555-9876</p>
              <p>Products</p>
            </div>
          </div>
        </div>
        <p className="text-center pb-8">
          © 2023 Copyright:{" "}
          <strong
            className="cursor-pointer hover:text-white"
            onClick={() => navigate("/")}
          >
            ARCHI-TECH CO.
          </strong>
        </p>
      </div>
    </div>
  );
};

export default FooterPage;
