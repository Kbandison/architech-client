import axios from "axios";
const orderData = `${process.env.REACT_APP_ENDPOINT}/orders`;

const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(orderData, config);

  return response.data;
};

const getAll = async (token) => {
  const response = await axios.get(`${orderData}/all-orders`);
  return response.data;
};

const getOrder = async (id, token) => {
  const response = await axios.get(`${orderData}/user-orders/${id}`);

  return response.data;
};

const createOrder = async (order, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${orderData}/add-order`, order, config);

  return response.data;
};

const statusShipped = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${orderData}/update-status/${id}`,
    { orderStatus: "shipped" },
    config
  );

  // console.log(token);
  console.log(response.data);

  return response.data;
};

const statusDelivered = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${orderData}/update-status/${id}`,
    { orderStatus: "delivered" },
    config
  );

  // console.log(token);
  console.log(response.data);

  return response.data;
};

const deleteOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${orderData}/remove-order/${id}`,
    config
  );

  return response.data;
};

const clearOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${orderData}/clear-orders`, config);

  return response.data;
};

const orderService = {
  getOrders,
  getAll,
  getOrder,
  createOrder,
  statusShipped,
  statusDelivered,
  deleteOrder,
  clearOrders,
};

export default orderService;
