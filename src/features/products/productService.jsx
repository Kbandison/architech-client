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
  getHistory,
  addHistory,
};

export default productService;
