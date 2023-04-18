import axios from "axios";

const userData = `${process.env.REACT_APP_ENDPOINT}/users`;

const register = async (user) => {
  const response = await axios.post(`${userData}/register`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${userData}/login`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const refresh = async () => {
  const response = await axios.get(`${userData}/refresh`);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  refresh,
  logout,
};

export default authService;
