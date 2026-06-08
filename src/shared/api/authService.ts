import { apiFetch } from "./api-client";

export const getMe = async () => {
  const response = await apiFetch("/auth/me");

  if (!response.ok || response.status === 204) {
    return { authenticated: false, user: null };
  }

  const data = await response.json();

  return data || { authenticated: true };
};

export const logout = async () => {
  const response = await apiFetch("auth/logout", { method: "POST" });

  return response;
};
