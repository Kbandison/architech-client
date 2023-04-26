import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllOrders,
  shipped,
  delivered,
  reset,
} from "../features/orders/ordersSlice";
import { addHistory } from "../features/history/historySlice";
import Spinner from "./Spinner";
import axios from "axios";
import AdminOrdersTable from "./AdminOrdersTable";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  const [statusChange, setStatusChange] = useState(true);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllOrders());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const update = async (id, status) => {
    // setStatusChange(status);

    await axios.put(
      `${process.env.REACT_APP_ENDPOINT}/orders/update-status/${id}`,
      {
        orderStatus: status,
      }
    );

    if (status === "delivered") {
      await dispatch(addHistory(id));
    }

    await dispatch(getAllOrders());
  };

  const newOrders = orders && orders.length > 0 && orders.map((order) => order);

  let reversedOrders = newOrders && newOrders.reverse();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="table-container">
      <h1>Orders to Fulfill</h1>
      <AdminOrdersTable
        orders={reversedOrders}
        count={`# of Orders: ${orders && orders.length}`}
        update={update}
        status={statusChange}
      />
    </div>
  );
};

export default AdminOrders;
