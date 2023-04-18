import React from "react";
import { Link, useNavigate } from "react-router-dom";

const OrderConfirm = () => {
  const navigate = useNavigate();

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <div>
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p>Order #: 123456789</p>
        <p>Order Date: 12/12/2020</p>
        <p>Order Total: $123.45</p>
        <button
          onClick={() => {
            navigate("/account/orders");
          }}
        >
          My orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirm;
