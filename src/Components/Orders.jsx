import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, reset } from "../features/orders/ordersSlice";
import Spinner from "./Spinner";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getOrders());
    console.log(orders);

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((item, i) => {
        return (
          <div key={i}>
            <img src={item.image} alt="" />
            <p>{item.product}</p>
            <p>{item.price}</p>
            <p>{item.quantity}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
