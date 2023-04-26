import axios from "axios";

const historyData = `${process.env.REACT_APP_ENDPOINT}/history`;

const getUserHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${historyData}/user-history`, config);

  return response.data;
};

const getAllHistory = async () => {
  const response = await axios.get(historyData);

  return response.data;
};

const addHistory = async (id, token) => {
  const response = await axios.post(`${historyData}/add-history/${id}`);

  return response.data;
};

const historyService = {
  getUserHistory,
  getAllHistory,
  addHistory,
};

export default historyService;
