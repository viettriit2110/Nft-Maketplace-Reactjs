import axios from "axios";
import { API } from "../config";

const defaultOptions = {
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosInstance;
