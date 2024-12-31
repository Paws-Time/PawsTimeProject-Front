import axios from "axios";
import { useAuthStore } from "@/app/hooks/authStore";
const api = axios.create({
  baseURL: "http://43.200.46.13:8080/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더 설정
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
