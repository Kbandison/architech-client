import React from "react";

const AdminOrdersTable = ({ orders, history, count, status, update }) => {
  return (
    <div>
      <table className="table">
        <caption>
          <h3>{count}</h3>
        </caption>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Order Total</th>
            <th>Order Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((item, i) => {
              return (
                <tr key={i}>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{new Date(item.orderDate).toLocaleString("en-US")}</td>
                  <td>
                    $
                    {Number(item.orderTotal).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{item.orderNumber}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.address && item.address.street},{" "}
                    {item.address && item.address.city},{" "}
                    {item.address && item.address.state},{" "}
                    {item.address && item.address.zip}
                  </td>
                  <td>{item.phoneNumber}</td>
                  {status ? (
                    <td>
                      <select
                        name="status"
                        id="status"
                        className="input"
                        value={item.orderStatus}
                        onChange={(e) => {
                          update(item.orderNumber, e.target.value);
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  ) : (
                    <td>{item.orderStatus}</td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="9">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersTable;
