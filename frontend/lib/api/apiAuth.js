import apiClient from "../ apiClient";

export const login = (credentials) =>
  apiClient.post('/login/', credentials).then(res => res.data);

export const register = (userInfo) =>
  apiClient.post('/register/', userInfo).then(res => res.data);

export const logout = () =>
  apiClient.post('/logout/').then(res => res.data);
