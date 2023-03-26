import axios from "axios";

import { adminBaseUrl , baseUrl } from "api/baseApi";

const adminUsersDataUrl = `${adminBaseUrl}/users`;


const axiosInstance = axios.create({
    baseUrl: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AuthToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// userData
// 取得所有
export const getAdminUsersAPI = async () => {
    try {
      const response = await axiosInstance.get(adminUsersDataUrl);
      return response.data;
    } catch (error) {
      console.error("[Admin get TweetsData failed]: ", error);
    }
  };