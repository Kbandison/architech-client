import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshUser } from "../features/auth/authSlice";

const Account = () => {
  const { user, accessToken, refreshToken } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = user.user;

  return (
    <div>
      <div>
        <h1>{userInfo.firstName}</h1>
        <h1>{userInfo.lastName}</h1>
      </div>
      <p>Email: {userInfo.email}</p>
    </div>
  );
};

export default Account;
