import React from "react";

const UserOrders = ({ order }) => {
  const reversedOrder = [...order].reverse();

  return (
    <div className="flex flex-col items-center relative">
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
                <p>Order Total: ${order.orderTotal.toLocaleString("en-US")}</p>
                <p>Order Status: {order.orderStatus}</p>
                <div className="flex justify-center">
                  <button className="button">Update Order</button>
                  <button className="button">Delete Order</button>
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
