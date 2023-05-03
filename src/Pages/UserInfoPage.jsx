import React from "react";
import { useParams } from "react-router-dom";
import UserInfo from "../Components/UserInfo";
import { getAUser } from "../features/users/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const UserInfoPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user } = useSelector((state) => state.users);

  return (
    <div className="flex flex-col items-center mt-32 w-full">
      <h1 className="mb-8">{user.firstName}'s Info</h1>
      <div className="border rounded-2xl p-8 flex flex-col gap-4">
        <h2>Customer ID: {user._id}</h2>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-2xl">
          <strong className="underline">Email:</strong> {user.email}
        </p>
        <p className="text-2xl">
          <strong className="underline">Phone #:</strong> {user.phoneNumber}
        </p>
        <p className="text-2xl">
          <strong className="underline">Role:</strong> {user.scope}
        </p>
        <p className="text-2xl">
          <strong className="underline">Street:</strong> {user.address.street}
        </p>
        <p className="text-2xl">
          <strong className="underline">City:</strong> {user.address.city}
        </p>
        <p className="text-2xl">
          <strong className="underline">State:</strong> {user.address.state}
        </p>
        <p className="text-2xl">
          <strong className="underline">Zip:</strong> {user.address.zip}
        </p>
        <p className="text-2xl">
          <strong className="underline"> Account Created:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString("en-US")}
        </p>
        {user.updatedAt && (
          <p className="text-2xl">
            <strong className="underline">Last Updated:</strong>{" "}
            {new Date(user.updatedAt).toLocaleDateString("en-us")}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserInfoPage;
