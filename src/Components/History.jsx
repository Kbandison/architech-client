import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserHistory, reset } from "../features/history/historySlice";

const History = () => {
  const dispatch = useDispatch();

  const { history, isError, message } = useSelector((state) => state.history);

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
    <div className="min-h-[50vh]">
      <h1 className="ml-16 mt-16">Order History</h1>
      <div className="m-16">
        {history && history.length > 0 ? (
          history.map((order, i) => {
            return (
              <div key={i} className="border-b flex flex-col gap-2 py-8">
                <h3>Status: {order.orderStatus.toUpperCase()}</h3>
                <p className="text-xl">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleString("en-US")}
                </p>
                <p className="text-xl">
                  <strong>Delivered Date:</strong>{" "}
                  {new Date(order.deliveredDate).toLocaleString("en-US")}
                </p>
                <p className="text-xl">
                  <strong>Order Total:</strong> $
                  {Number(order.orderTotal).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p>
                  <strong>Order Status:</strong> {order.orderStatus}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.orderItems.length}
                </p>
                <h3 className="my-8">Order Items: </h3>
                <div className="p-4 grid grid-cols-3 gap-4 m-4 ">
                  {order.orderItems.map((item, i) => {
                    return (
                      <div key={i} className="flex justify-center p-4">
                        <div className="flex flex-col items-center">
                          <img src={item.product.image} alt="" />
                          <ul className="my-8 flex flex-col gap-2 w-full">
                            <li className="text-xl font-bold w-96">
                              {item.product.name}
                            </li>
                            <li>
                              <strong> Price Paid:</strong> $
                              {Number(item.product.totalPrice).toLocaleString(
                                "en-US",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              {item.product.regularPrice >
                                item.product.salePrice && (
                                <span className="text-green-500">SALE!</span>
                              )}
                            </li>
                            <li>
                              <strong>Quantity:</strong> {item.product.quantity}
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No orders found</h1>
        )}
      </div>
    </div>
  );
};

export default History;
