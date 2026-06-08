import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const finalOptions: RequestInit = {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  };

  const response = await fetch(`${BASE_URL}/${endpoint}`, finalOptions);

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return response;
};

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
