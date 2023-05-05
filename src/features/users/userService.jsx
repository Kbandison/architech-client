import axios from "axios";

const userData = `${process.env.REACT_APP_ENDPOINT}/users`;

const getUsers = async (token) => {
  const response = await axios.get(userData);

  return response.data;
};

const getUser = async (id, token) => {
  const response = await axios.get(`${userData}/user/${id}`);

  return response.data;
};

const updateUser = async (id, user, token) => {
  const response = await axios.put(`${userData}/users/update/${id}`, user);

  return response.data;
};

const deleteUser = async (id, token) => {
  const response = await axios.delete(`${userData}/delete/${id}`);

  return response.data;
};

const deleteAllUsers = async (token) => {
  const response = await axios.delete(`${userData}/users/delete-all`);

  return response.data;
};

const userservice = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
};

export default userservice;
