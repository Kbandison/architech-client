import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { useOutletContext } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setIsLoggedIn = useOutletContext();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [loginMessage, setLoginMessage] = useState("");
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isError) {
      setLoginMessage(message);
      dispatch(reset());
      console.log(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setloginData((register) => {
      return {
        ...register,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    dispatch(loginUser(loginData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="border 3xl:w-1/4 2xl:w-1/4 xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-2/3 xs:w-3/4 rounded-3xl mt-40">
      <h2 className="text-center mt-20">Log In to your Account</h2>
      <p className="text-center mt-10 mb-6">
        Don't Have an Account?{" "}
        <Link
          to="/register"
          className="link font-bold hover:underline hover:underline-offset-4 hover:decoration-[#DE3C4B]"
        >
          Register
        </Link>
      </p>
      {loginMessage ? (
        <p className="text-center text-red-500 font-bold animate-pulse">
          {loginMessage}
        </p>
      ) : (
        ""
      )}
      <div className="flex justify-center">
        <form
          action=""
          onSubmit={handleSubmit}
          className=" flex flex-col align-center justify-center p-12 w-full"
        >
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="mb-12 input"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Password"
            className="mb-4 input"
          />
          <button type="submit" className="button mt-8 text-xl font-bold ">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
