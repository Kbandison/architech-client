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

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message]);

  console.log("Orders", orders);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((item, i) => {
        return (
          <div key={i} className="m-16 border-b pb-12">
            <h3>Order {i + 1}: </h3>
            <p>
              Ordered at: {new Date(item.orderDate).toLocaleString("en-US")}
            </p>
            <p>
              Order Total: ${item.orderTotal.toFixed(2).toLocaleString("en-US")}
            </p>
            <p>Order #: {item.orderNumber}</p>
            <p>Status: "{item.orderStatus}"</p>
            <p>Items:</p>
            {item.orderItems.map((item, i) => {
              return (
                <div key={i}>
                  <img src={item.product.image} alt="" />
                  <ul>
                    <li>Item sku: {item.product.sku}</li>
                    <li>Item: {item.product.name}</li>
                    <li>
                      Price: ${item.product.totalPrice.toLocaleString("en-US")}
                    </li>
                    <li>Quantity: {item.product.quantity}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
