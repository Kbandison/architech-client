import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../features/auth/authSlice";

const Account = () => {
  const { user, accessToken, refreshToken } = useSelector(
    (state) => state.auth.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h1>{user.firstName}</h1>
        <h1>{user.lastName}</h1>
        <p>Account ID: {user._id}</p>
        <p>Email: {user.email}</p>
        <p>Phone #: {user.phoneNumber}</p>
      </div>
      <h4>Address: </h4>
      <p>Street: {user.address.street}</p>
      <p>City: {user.address.city}</p>
      <p>State: {user.address.state}</p>
      <p>Zip: {user.address.zip}</p>
    </div>
  );
};

export default Account;
