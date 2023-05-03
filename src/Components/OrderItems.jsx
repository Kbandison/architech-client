import React from "react";

const OrderItems = ({ orderItem, reveal, index }) => {
  console.log("OrderItems", orderItem);
  return (
    <div>
      <div
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
              {Number(orderItem.product.totalPrice).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {orderItem.product.regularPrice > orderItem.product.salePrice && (
                <span className="text-green-500">SALE!</span>
              )}
            </li>
            <li>Quantity: {orderItem.product.quantity}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderItems;
