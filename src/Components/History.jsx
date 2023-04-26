import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserHistory, reset } from "../features/history/historySlice";

const History = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { history, isLoading, isError, message } = useSelector(
    (state) => state.history
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUserHistory());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  return (
    <div>
      <h1>Order History</h1>
      <br />
      {history && history.length > 0 ? (
        history.map((order, i) => {
          return (
            // <div key={i}>
            //   <h1>Manufacturer: {order.manufacturer}</h1>
            //   <h1>Product name: {order.name}</h1>
            // </div>
            <div key={i}>
              <h1>Order #{order.orderNumber}</h1>
              <p>Order Date: {order.orderDate}</p>
              <p>Order Total: ${order.orderTotal}</p>
              <p>Order Status: {order.orderStatus}</p>
              {/* <p>Order Items: {order.orderItems}</p> */}
              <p>Quantity: {order.orderItems.length}</p>
            </div>
          );
        })
      ) : (
        <h1>No orders found</h1>
      )}
    </div>
  );
};

export default History;
