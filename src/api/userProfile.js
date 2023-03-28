import axios from "axios";

import { baseUrl,userUrl } from "api/baseApi";


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

// get取得個人資料
export const getUserDataAPI = async(user_id)=>{
  try {
    const response = await axiosInstance.get(userUrl(user_id));
    return response;
  } catch (error) {
    console.error("[Get user data failed]: ", error);
  }
}

// put修改個人資料
export const editUserDataAPI = async(user_id, data)=>{
  try {
    const response = await axiosInstance.put(userUrl(user_id),{
      name: data.name,
      introduction: data.introduction
    });
    return response;
  } catch (error) {
    console.error("[Get user data failed]: ", error);
  }
}