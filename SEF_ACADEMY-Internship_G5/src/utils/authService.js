import api from "../api/axios";

export const login = async (userData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};