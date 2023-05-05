import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../features/users/userSlice";
import UpdateAccount from "./UpdateAccount";
import { useState } from "react";
import { logoutUser } from "../features/auth/authSlice";

const Account = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [update, setUpdate] = useState(false);

  const deleteMyAccount = async () => {
    await dispatch(logoutUser());
    navigate("/login");
    await dispatch(deleteUser(user._id));
  };
  return (
    <div className="">
      <h1 className="my-24 w-[100%] text-center">
        {user.firstName} {user.lastName}
      </h1>
      <div className="flex justify-evenly">
        <div className="m-16 border flex flex-col gap-6 p-8 rounded-2xl w-[15%]">
          <h3 className="border-b pb-2">Account ID: </h3>
          <p className="text-xl">{user._id}</p>
          {user.scope !== "customer" && (
            <h3 className="border-b pb-2">Scope: </h3>
          )}
          {user.scope !== "customer" && <p className="text-xl">{user.scope}</p>}
          <h3 className="border-b pb-2">Created:</h3>
          <p className="text-xl">
            {new Date(user.createdAt).toLocaleString("en-US")}
          </p>
          {user.updatedAt && <h3 className="border-b pb-2">Last Updated:</h3>}
          {user.updatedAt && (
            <p className="text-xl">
              {new Date(user.updatedAt).toLocaleString("en-US")}
            </p>
          )}
        </div>
        <div className="p-16 m-16 border rounded-2xl flex flex-col w-[30%] items-center">
          <div className="flex flex-col gap-4  ">
            <div className="flex justify-between gap-4">
              <div className="w-1/2">
                <h3 className="">Email: </h3>
                <p>{user.email}</p>
              </div>
              <div className="w-1/2">
                <h3 className="">Phone #: </h3>
                <p className="text-xl">{user.phoneNumber}</p>
              </div>
            </div>
            <h2 className="border-b pb-2">Address: </h2>
            <div className="flex justify-evenly gap-4">
              <div className="w-1/2">
                <h3 className="">Street: </h3>
                <p className="text-xl">{user.address.street}</p>
              </div>
              <div className="w-1/2">
                <h3 className="">City: </h3>
                <p className="text-xl">{user.address.city}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <div className="w-1/2">
                <h3 className="">State: </h3>
                <p className="text-xl">{user.address.state}</p>
              </div>
              <div className="w-1/2">
                <h3 className="">Zip: </h3>
                <p className="text-xl">{user.address.zip}</p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button className="button" onClick={() => setUpdate(true)}>
                Update My Account
              </button>
              <button className="button" onClick={() => deleteMyAccount()}>
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateAccount user={user} update={update} setUpdate={setUpdate} />
    </div>
  );
};

export default Account;
