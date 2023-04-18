import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminNavBar = () => {
  return (
    <div>
      <div className="flex justify-center mt-6 mb-8 border-t border-b border-[#DE3C4B]">
        <Link to="/admin/users" className="button">
          Users
        </Link>
        <Link to="/admin/orders" className="button">
          Current Orders
        </Link>
        <Link to="/admin/history" className="button">
          Past Orders
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminNavBar;
