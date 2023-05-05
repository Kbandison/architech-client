import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logoutUser } from "../features/auth/authSlice";

const UpdateAccount = ({ user, update, setUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateData, setUpdateData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: {
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      zip: user.address.zip,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "firstName" || name === "lastName")
      newValue = value.replace(/\b\w/g, (c) => c.toUpperCase());

    if (name === "phoneNumber") {
      newValue = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
    }

    setUpdateData((update) => {
      return {
        ...update,
        [name]: newValue,
      };
    });
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "street" || name === "city")
      newValue = value.replace(/\b\w/g, (c) => c.toUpperCase());

    if (name === "state") {
      newValue = value.toUpperCase();
    }

    setUpdateData((update) => {
      return {
        ...update,
        address: {
          ...update.address,
          [name]: newValue,
        },
      };
    });
  };

  const updateUser = async (id, user) => {
    await axios.put(
      `${process.env.REACT_APP_ENDPOINT}/users/update/${id}`,
      user
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser(user.id, updateData);
    setUpdate(false);
    dispatch(logoutUser());
    navigate("/login");
  };

  if (!update) {
    return null;
  } else {
    return (
      <div className="fixed bg-black w-full h-screen flex justify-center items-center bg-opacity-70 backdrop-blur-sm inset-0">
        <div className="border p-8 rounded-xl">
          <h1 className="text-center">Update Account</h1>
          <br />
          <h1 className="text-center bg-white text-black">
            You'll be sent to log in again after update.
          </h1>
          <form
            action=""
            className="mt-8 p-4 flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <div className="mb-12">
              {/* <label htmlFor="firstName">First Name</label> */}
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={updateData.firstName}
                onChange={handleChange}
                className="mr-2 input bg-inherit"
              />
              {/* <label htmlFor="lastName">Last Name</label> */}
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={updateData.lastName}
                onChange={handleChange}
                className="input bg-inherit"
              />
            </div>
            <div className="flex ">
              {/* <label htmlFor="email">Email</label> */}
              <input
                type="email"
                name="email"
                id="email"
                value={updateData.email}
                onChange={handleChange}
                className="input mr-2 bg-inherit"
              />
              {/* <label htmlFor="phoneNumber">Phone Number</label> */}
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                pattern="[(][0-9]{3}[)]-[0-9]{3}-[0-9]{4}"
                maxLength="12"
                value={updateData.phoneNumber}
                onChange={handleChange}
                className="input bg-inherit"
              />
            </div>
            <div className="mt-12">
              <div className="mb-12">
                {/* <label htmlFor="street">Street</label> */}
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={updateData.address.street}
                  onChange={handleChangeAddress}
                  className="mr-2 input bg-inherit"
                />
                {/* <label htmlFor="city">City</label> */}
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={updateData.address.city}
                  onChange={handleChangeAddress}
                  className="input bg-inherit"
                />
              </div>
              <div>
                {/* <label htmlFor="state">State</label> */}
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={updateData.address.state}
                  onChange={handleChangeAddress}
                  className="mr-2 input bg-inherit"
                />
                {/* <label htmlFor="zip">Zip</label> */}
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={updateData.address.zip}
                  onChange={handleChangeAddress}
                  className="input bg-inherit"
                />
              </div>
            </div>
            <div className="mt-8">
              <button
                className="button text-xl"
                onClick={() => setUpdate(false)}
              >
                Cancel
              </button>
              <button className="button text-xl">Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default UpdateAccount;
