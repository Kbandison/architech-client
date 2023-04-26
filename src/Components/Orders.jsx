import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, reset } from "../features/orders/ordersSlice";
import Spinner from "./Spinner";
import { logoutUser } from "../features/auth/authSlice";
import { useState } from "react";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.orders
  );

  const [itemsList, setItemsList] = useState([]);
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (message.includes("Token has expired!")) {
      dispatch(logoutUser());
      navigate("/login");
    }

    dispatch(getOrders());

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  let reversedOrders = [...orders].reverse();

  const toggleReveal = (index) => {
    setItemsList(reversedOrders[index].orderItems);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Orders</h1>
      {reversedOrders ? (
        reversedOrders.map((item, i) => {
          return (
            <div key={i} className="m-16 border-b pb-12 border">
              <div>
                <h2>
                  Ordered at: {new Date(item.orderDate).toLocaleString("en-US")}
                </h2>
                <p>
                  Order Total: $
                  {Number(item.orderTotal).toFixed(2).toLocaleString("en-US")}
                </p>
                {item.orderSavings > 0 && (
                  <p>Order Savings: {item.orderSavings.toFixed(2)}</p>
                )}
                <p>Order #: {item.orderNumber}</p>
                <p>Status: "{item.orderStatus}"</p>
                <p>
                  Items:{" "}
                  <button
                    onClick={() => {
                      toggleReveal(i);
                      setReveal(!reveal);
                    }}
                    className="button w-44"
                  >
                    See Products
                  </button>
                </p>
              </div>
              <div
              // className={` ${reveal ? "block" : "hidden"}`}
              >
                {itemsList ? (
                  itemsList.map((orderItem, i) => {
                    return (
                      <div
                        key={i}
                        // className={` ${
                        //   itemsList[i] && reveal ? "block" : "hidden"
                        // }`}
                      >
                        <div className={`${reveal ? "block" : "hidden"}`}>
                          <img src={orderItem.product.image} alt="" />
                          <ul>
                            <li>orderItem sku: {orderItem.product.sku}</li>
                            <li>orderItem: {orderItem.product.name}</li>
                            <li>
                              Price: $
                              {orderItem.product.totalPrice.toLocaleString(
                                "en-US"
                              )}{" "}
                              {orderItem.product.regularPrice >
                                orderItem.product.salePrice && (
                                <span className="text-green-500">SALE!</span>
                              )}
                            </li>
                            <li>Quantity: {orderItem.product.quantity}</li>
                          </ul>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h3>Cannot Find Items</h3>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <h3>Cannot Find Orders</h3>
      )}
      {orders.length === 0 && (
        <h2 className="text-center m-96">No Orders Yet</h2>
      )}
    </div>
  );
};

export default Orders;
