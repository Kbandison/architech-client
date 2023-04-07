import axios from "axios";
const productData = `${process.env.REACT_APP_ENDPOINT}/products`;

/*****************ADMIN ROUTES****************/
const getProducts = async () => {
  const response = await axios.get(productData);

  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(`${productData}/${id}`);

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${productData}/delete/${id}`);

  return response.data;
};

/*****************USER ROUTES****************/

// WISHLIST
const getWhishlist = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${productData}/wishlist`, config);

  return response.data;
};

const addWishItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${productData}/add-wishlist/${id}`, config);

  return response.data;
};

const removeWishItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${productData}/remove-wishlist/${id}`,
    config
  );

  return response.data;
};

// CART
const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${productData}/cart`, config);

  return response.data;
};

const addCart = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${productData}/add-cart/${id}`, config);

  return response.data;
};

const removeCart = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${productData}/remove-cart/${id}`, config);

  return response.data;
};

const clearCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${productData}/clear-cart`, config);

  return response.data;
};

//ORDER HISTORY
const getHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${productData}/history`, config);

  return response.data;
};

const addHistory = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(`${productData}/add-history/${id}`, config);

  return response.data;
};

const productService = {
  getProducts,
  getProduct,
  deleteProduct,
  getWhishlist,
  addWishItem,
  removeWishItem,
  getCart,
  addCart,
  removeCart,
  getHistory,
  addHistory,
};

export default productService;
