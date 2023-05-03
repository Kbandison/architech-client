import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllOrders,
  reset,
  deleteOrder,
} from "../features/orders/ordersSlice";
import { addHistory } from "../features/history/historySlice";
import axios from "axios";
import { useState, useEffect } from "react";

const UserOrders = ({ order }) => {
  const reversedOrder = [...order].reverse();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  const [trigger, setTrigger] = useState(false);

  // const [statusChange, setStatusChange] = useState(true);

  // const update = async (id, status) => {
  //   // setStatusChange(status);

  //   await axios.put(
  //     `${process.env.REACT_APP_ENDPOINT}/orders/update-status/${id}`,
  //     {
  //       orderStatus: status,
  //     }
  //   );

  //   if (status === "delivered") {
  //     await dispatch(addHistory(id));
  //   }

  //   await dispatch(getAllOrders());
  // };

  useEffect(() => {
    console.log("trigger", trigger);
  }, [dispatch, trigger]);

  const handleDelete = async (id) => {
    setTrigger((prev) => true);
    await dispatch(deleteOrder(id));
    await dispatch(getAllOrders());
  };

  return (
    <div className="flex flex-col items-center relative mt-16">
      {order.length > 0 && (
        <h3 className="text-center border-b w-96">
          # of Orders: {order.length}
        </h3>
      )}

      <div className="flex flex-col items-center">
        {reversedOrder.length > 0 ? (
          reversedOrder.map((order, i) => {
            return (
              <div key={i} className="border-b flex flex-col  gap-2 m-4 p-4">
                <h4>Order Number: {order.orderNumber}</h4>
                <p>Customer ID: {order.user}</p>
                <p>
                  Order Date:{" "}
                  {new Date(order.orderDate).toLocaleString("en-US")}
                </p>
                <p>
                  Order Total: $
                  {Number(order.orderTotal).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p>Order Status: {order.orderStatus}</p>
                {/* <p>
                  <select
                    name="status"
                    id="status"
                    className="input"
                    value={order.orderStatus}
                    onChange={(e) => {
                      update(order.orderNumber, e.target.value);
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </p> */}
                <div className="flex justify-center">
                  <button
                    className="button"
                    onClick={() => handleDelete(order.orderNumber)}
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No orders found</h3>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
