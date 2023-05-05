import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, reset } from "../features/orders/ordersSlice";
import Spinner from "./Spinner";
import { logoutUser } from "../features/auth/authSlice";

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-[50vh]">
      <h1 className="ml-16 mt-16">Current Orders</h1>
      {reversedOrders ? (
        reversedOrders.map((item, i) => {
          return (
            <div key={i} className="m-16 border-b pb-12">
              <div className="flex flex-col gap-2 w-96">
                <h2 className="border-b w-[90%]">
                  Ordered on:{" "}
                  {new Date(item.orderDate).toLocaleDateString("en-US")}
                </h2>
                <p>
                  <strong>Order Total:</strong> $
                  {Number(item.orderTotal).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                {item.orderSavings > 0 && (
                  <p>
                    <strong>Order Savings:</strong> $
                    {Number(item.orderSavings).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                )}
                <p>
                  <strong>Order #:</strong> {item.orderNumber}
                </p>
                <p>
                  <strong>Status:</strong> "{item.orderStatus}"
                </p>
                <p>
                  <strong>Quantity Total:</strong>{" "}
                  {item.orderItems &&
                    item.orderItems.length > 0 &&
                    item.orderItems.length}
                </p>
                <h3 className="mt-8">Items Purchased: </h3>
              </div>
              <div className="p-4 grid grid-cols-3 gap-4 m-4 ">
                {item.orderItems ? (
                  item.orderItems.map((orderItem, i) => {
                    return (
                      <div key={i} className="flex justify-center p-4">
                        <div className="flex flex-col items-center">
                          <img src={orderItem.product.image} alt="" />
                          <ul className="my-8 flex flex-col gap-2 w-full">
                            <li className="text-xl font-bold w-96">
                              {orderItem.product.name}
                            </li>
                            <li>
                              <strong> Price Paid:</strong> $
                              {Number(
                                orderItem.product.totalPrice
                              ).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              {orderItem.product.regularPrice >
                                orderItem.product.salePrice && (
                                <span className="text-green-500">SALE!</span>
                              )}
                            </li>
                            <li>
                              <strong>Quantity:</strong>{" "}
                              {orderItem.product.quantity}
                            </li>
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
