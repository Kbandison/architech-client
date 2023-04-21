import axios from "axios";

const userData = `${process.env.REACT_APP_ENDPOINT}/users`;

const getUsers = async (token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.get(
    userData
    // config
  );

  return response.data;
};

const getUser = async (id, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.get(
    `${userData}/user/${id}`
    // config
  );

  return response.data;
};

const updateUser = async (id, user, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.put(
    `${userData}/users/update/${id}`,
    user
    // config
  );

  return response.data;
};

const deleteUser = async (id, token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.delete(
    `${userData}/delete/${id}`
    // config
  );

  return response.data;
};

const deleteAllUsers = async (token) => {
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const response = await axios.delete(
    `${userData}/users/delete-all`
    // config
  );

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
