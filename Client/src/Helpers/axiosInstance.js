import axios from "axios";
const BASE_URL = "http://44.204.147.69:5016/api/v1";
// const BASE_URL = "http://localhost:5016/api/v1";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;
