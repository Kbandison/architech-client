import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [registerMessage, setRegisterMessage] = useState("");
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    phoneNumber: "",
  });

  useEffect(() => {
    if (isError) {
      setRegisterMessage(message);
      dispatch(reset());
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "firstName" || name === "lastName")
      newValue = value.replace(/\b\w/g, (c) => c.toUpperCase());

    if (name === "phoneNumber") {
      newValue = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
    }

    setRegisterData((register) => {
      return {
        ...register,
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

    setRegisterData((register) => {
      return {
        ...register,
        address: {
          ...register.address,
          [name]: newValue,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setRegisterMessage("Passwords do not match");
    }

    dispatch(registerUser(registerData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="rounded-3xl mt-40 border">
      <h2 className="text-center mt-20">Register for Access</h2>
      <p className="text-center mt-10 mb-5">
        Already Have an Account?{" "}
        <Link
          to="/login"
          className="link font-bold hover:underline hover:underline-offset-4 hover:decoration-[#DE3C4B]"
        >
          Log In
        </Link>
      </p>
      <h4 className="text-center text-[#de3c48] animate-pulse">
        {registerMessage && registerMessage}
      </h4>
      <div className="flex justify-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className=" flex flex-col align-center justify-center p-12 "
        >
          <div className="mb-12 ">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={registerData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="mr-2 input"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={registerData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              id="email"
              value={registerData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="mb-12 input"
            />
            <input
              type="tel"
              pattern="[(][0-9]{3}[)]-[0-9]{3}-[0-9]{4}"
              maxLength="12"
              name="phoneNumber"
              id="phoneNumber"
              value={registerData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input"
            />
          </div>
          <div className="mt-12">
            <div className="mb-12">
              <input
                type="text"
                name="street"
                id="street"
                value={registerData.address.street}
                onChange={handleChangeAddress}
                placeholder="Street Address"
                className="mr-2 input"
              />
              <input
                type="text"
                name="city"
                id="city"
                value={registerData.address.city}
                onChange={handleChangeAddress}
                placeholder="City"
                className="input"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                id="state"
                value={registerData.address.state}
                onChange={handleChangeAddress}
                placeholder="State"
                className="mr-2 input"
              />
              <input
                type="text"
                name="zip"
                id="zip"
                value={registerData.address.zip}
                onChange={handleChangeAddress}
                placeholder="Zip Code"
                className="input"
              />
            </div>
          </div>
          <div className="flex flex-col mt-12">
            <input
              type="password"
              name="password"
              id="password"
              value={registerData.password}
              onChange={handleChange}
              placeholder="Password"
              className="mb-4 input"
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="input mt-12"
            />
          </div>
          <button type="submit" className="button mt-8 text-xl font-bold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
