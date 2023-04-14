import axios from "axios";
const cartData = `${process.env.REACT_APP_ENDPOINT}/cart`;

const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(cartData, config);

  return response.data;
};

const addCart = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${cartData}/add-cart/${id}`, {}, config);

  return response.data;
};

const removeCart = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${cartData}/remove-cart/${id}`, config);

  return response.data;
};

const clearCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${cartData}/clear-cart`, config);

  return response.data;
};

const cartService = {
  getCart,
  addCart,
  removeCart,
  clearCart,
};

export default cartService;
