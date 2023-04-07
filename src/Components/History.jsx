import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const history = user.user.orderHistory;
  console.log(history);

  return (
    <div>
      <h1>Order History</h1>
      <br />
      {history.map((order, i) => {
        return (
          <div key={i}>
            <h1>Manufacturer: {order.manufacturer}</h1>
            <h1>Product name: {order.name}</h1>
          </div>
          // <div key={i}>
          //   <h1>Order #{order.orderNumber}</h1>
          //   <p>Order Date: {order.orderDate}</p>
          //   <p>Order Total: ${order.orderTotal}</p>
          //   <p>Order Status: {order.orderStatus}</p>
          //   <p>Order Items: {order.orderItems}</p>
          // </div>
        );
      })}
    </div>
  );
};

export default History;
