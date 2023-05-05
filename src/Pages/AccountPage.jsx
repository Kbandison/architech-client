import Account from "../Components/Account";
import { useSelector } from "react-redux";

const AccountPage = () => {
  const { user } = useSelector((state) => state.auth.user);

  return (
    <div className="">
      <Account user={user} />
    </div>
  );
};

export default AccountPage;
