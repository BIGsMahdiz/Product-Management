import { getCookie } from "@/utils/cookie";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (request) => {
    const token = getCookie();
    if (token) {
      request.headers["Authorization"] = `bearer ${token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  return response; // Since we don't have a refresh token, I didn't do anything else here
});

export default api;
