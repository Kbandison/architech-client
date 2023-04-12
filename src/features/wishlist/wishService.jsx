import axios from "axios";
const wishData = `${process.env.REACT_APP_ENDPOINT}/wishlist`;

const getWishes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(wishData, {}, config);

  return response.data;
};

const addWishItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${wishData}/add-wish/${id}`, {}, config);

  return response.data;
};

const removeWishItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${wishData}/remove-wish/${id}`,
    {},
    config
  );

  return response.data;
};

const clearWishes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${wishData}/clear-wish`, {}, config);

  return response.data;
};

const wishService = {
  getWishes,
  addWishItem,
  removeWishItem,
  clearWishes,
};

export default wishService;
