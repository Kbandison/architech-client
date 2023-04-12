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

const getOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${orderData}/${id}`, {}, config);

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

const deleteOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${orderData}/remove-order/${id}`,
    {},
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

  const response = await axios.delete(`${orderData}/clear-orders`, {}, config);

  return response.data;
};

const orderService = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  clearOrders,
};

export default orderService;
