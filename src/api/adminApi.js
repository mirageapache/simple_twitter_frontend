import axios from "axios";

import { adminBaseUrl , baseUrl } from "api/baseApi";

const adminUsersDataUrl = `${adminBaseUrl}/users`;
const adminTweetsDataUrl = `${adminBaseUrl}/tweets`;
const adminTweetDataUrl = (id) => `${adminBaseUrl}/tweets/${id}`; 


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

// userData取得所有
export const getAdminUsersAPI = async () => {
    try {
      const response = await axiosInstance.get(adminUsersDataUrl);
      return response.data;
    } catch (error) {
      console.error("[Admin get TweetsData failed]: ", error);
    }
  };

// tweetsData取得所有
export const getAdminTweetsAPI = async () => {
  try {
    const response = await axiosInstance.get(adminTweetsDataUrl);
    return response.data
  } catch (error) {
    console.error("[Admin get TweetsData failed]: ", error);
  }
};

// tweetData刪除單筆
export const delAdminTweetAPI = async (id) => {
  try {
    const response = await delete adminTweetDataUrl(id);
    return response.data;
  } catch (error) {
    console.error("[Admin delete tweet failed]:", error);
  }
};