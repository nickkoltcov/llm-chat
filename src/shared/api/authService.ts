import { apiClient } from "./api-client";
import { IGetMeResponse } from "@/shared/type/index";

export const getMe = async () => {
  try {
    const response = await apiClient.get<IGetMeResponse>("/auth/me");

    if (response.status === 204) {
      return { authenticated: false, user: null };
    }

    const data = response.data;
    return data || { authenticated: true };
  } catch (error) {
    return { authenticated: false, user: null };
  }
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");

  return response;
};
