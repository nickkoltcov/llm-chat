import axios from "axios";
import { routes } from "@/shared/config/routes";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      window.location.href = routes.login();
    }

    return Promise.reject(error);
  },
);
