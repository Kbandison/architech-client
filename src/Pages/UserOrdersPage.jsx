import React from "react";
import UserOrders from "../Components/UserOrders";
import { getUserOrder } from "../features/orders/ordersSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const UserOrdersPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const getUserOrders = async () => {
      await dispatch(getUserOrder(id))
        .then((res) => {
          setUserOrders(res.payload.orders);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUserOrders();
  }, [dispatch, id]);

  return (
    <div className="w-full">
      <UserOrders order={userOrders} />
    </div>
  );
};

export default UserOrdersPage;
