import Account from "../Components/Account";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.user);

  return (
    <div className="">
      <Account user={user} />
    </div>
  );
};

export default AccountPage;
