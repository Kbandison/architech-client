import { Link, Outlet } from "react-router-dom";

const AccountBar = () => {
  return (
    <div>
      <div className="flex justify-center mt-6 mb-8 border border-[#DE3C4B]">
        <Link to="/account" className="button font-bold">
          Account Info
        </Link>
        <Link to="/account/orders" className="button font-bold">
          Orders
        </Link>
        <Link to="/account/order-history" className="button font-bold">
          Order History
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AccountBar;
