import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers, reset } from "../features/users/userSlice";
import { getAllOrders } from "../features/orders/ordersSlice";
import { updateAUser } from "../features/users/userSlice";
import { deleteUser } from "../features/users/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const UserAccounts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

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
    <div>
      <h1>User Accounts</h1>
      <div>
        <h1># of User accounts: {users.length}</h1>
        {reversedUsers.length > 0 ? (
          reversedUsers.map((user, i) => {
            return (
              <div key={i} className="border flex flex-col w-96 gap-2 m-4 p-4">
                <h4>
                  {user.firstName} {user.lastName}
                </h4>
                <p>Email: {user.email}</p>
                <p>Role: {user.scope}</p>
                <p>
                  Created at: {new Date(user.createdAt).toLocaleString("en-US")}
                </p>
                {user.updatedAt && (
                  <p>
                    Updated at:{" "}
                    {new Date(user.updatedAt).toLocaleString("en-US")}
                  </p>
                )}
                <div>
                  <button className="button">View Orders</button>
                  <button className="button">Update User</button>
                  {user.scope === "customer" && (
                    <button
                      className="button"
                      onClick={() => {
                        dispatch(deleteUser(user.id));
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
    </div>
  );
};

export default UserAccounts;
