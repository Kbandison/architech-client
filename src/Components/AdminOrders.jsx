import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, reset } from "../features/orders/ordersSlice";
import Spinner from "./Spinner";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  const [statusChange, setStatusChange] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllOrders());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  let reversedOrders = [...orders].reverse();

  const handleSubmit = (e) => {};

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Orders to Fulfill</h1>
      <h3># of Orders: {orders.length}</h3>
      {reversedOrders ? (
        reversedOrders.map((item, i) => {
          return (
            <div key={i} className="m-16 border-b pb-12">
              <h3>
                Ordered on: {new Date(item.orderDate).toLocaleString("en-US")}
              </h3>
              <h5>
                Customer: {item.firstName} {item.lastName}
              </h5>
              <p>User ID: {item.user}</p>
              <p>
                Order Total: ${Number(item.orderTotal).toLocaleString("en-US")}
              </p>
              <p>Order #: {item.orderNumber}</p>
              {/* <p>Status: "{item.orderStatus}"</p> */}
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="status">Status: </label>
                <select
                  name="status"
                  id="status"
                  className="input"
                  value={item.orderStatus}
                  onChange={(e) => setStatusChange(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <br />
                <button className="button">Update Status</button>
              </form>
            </div>
          );
        })
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default AdminOrders;
