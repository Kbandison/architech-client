import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset } from "../features/users/userSlice";
import { getAUser } from "../features/users/userSlice";
import { deleteUser } from "../features/users/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { Outlet } from "react-router-dom";

const UserAccounts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  const handleGetUser = async (id) => {
    await dispatch(getAUser(id));
    navigate(`/admin/users/${id}`);
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  let reversedUsers = users.length > 0 && [...users].reverse();

  const refreshPage = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="">
      <h1 className="text-center ">User Accounts/Orders</h1>
      <div className="flex h-auto ">
        <div className="4xl:w-1/4 3xl:w-1/4 2xl:w-1/4 xl:w-1/2 lg:w-1/2 md:w-1/2 flex flex-col items-center ">
          <h2 className="mt-4 border-b p-2 m-8 ">
            # of User accounts: {users.length}
          </h2>
          {reversedUsers.length > 0 ? (
            reversedUsers.map((user, i) => {
              return (
                <div
                  key={i}
                  className="border-b flex flex-col gap-2 p-4 items-center w-4/5"
                >
                  <h4>
                    {user.firstName} {user.lastName}
                  </h4>
                  <p>Account ID: {user._id}</p>
                  <p>Email: {user.email}</p>
                  <p>Role: {user.scope}</p>
                  <p>
                    Created at:{" "}
                    {new Date(user.createdAt).toLocaleString("en-US")}
                  </p>
                  {user.updatedAt && (
                    <p>
                      Updated at:{" "}
                      {new Date(user.updatedAt).toLocaleString("en-US")}
                    </p>
                  )}
                  <div className="flex justify-center items-center">
                    <button
                      className="button"
                      onClick={() =>
                        navigate(`/admin/users/orders/${user._id}`)
                      }
                    >
                      View Orders
                    </button>
                    <button
                      className="button"
                      onClick={() => handleGetUser(user._id)}
                    >
                      View User Info
                    </button>
                    {user.scope === "customer" && (
                      <button
                        className="button"
                        onClick={() => {
                          dispatch(deleteUser(user._id));
                          refreshPage();
                        }}
                      >
                        Delete User
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No users found</p>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserAccounts;
