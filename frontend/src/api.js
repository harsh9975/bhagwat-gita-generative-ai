import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to get the access token from your preferred source (localStorage, Redux store, etc.)
const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};

// Add a request interceptor to set the access token in the request headers
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
