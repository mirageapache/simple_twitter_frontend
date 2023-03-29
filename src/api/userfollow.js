import axios from "axios";

import { baseUrl,userUrl } from "api/baseApi";

const userFollowersUrl = (user_id) => `${userUrl(`${user_id}`)}/followers`;
const userFollowingsUrl = (user_id) => `${userUrl(`${user_id}`)}/followings`;

const followShipsUrl = `${baseUrl}/followships`
const unFollowUrl =(following_id) => `${followShipsUrl}/${following_id}`

const recommendUrL =(count)=>`${baseUrl}/followships/top/${count}`

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

// user取得自己的follower
export const getFollowersDataAPI =async(user_id)=>{
    try {
        const response = await axiosInstance.get(userFollowersUrl(user_id));
        return response.data;
      } catch (error) {
        console.error("[User get self like data failed]: ", error);
      }
}


export const getFollowingsDataAPI =async(user_id)=>{
  try {
      const response = await axiosInstance.get(userFollowingsUrl(user_id));
      return response.data;
    } catch (error) {
      console.error("[User get self like data failed]: ", error);
    }
}

// 刪除跟隨，帶入對方id
export const unFollowAPI = async (followingId) => {
  try {
    const response = await axiosInstance.delete(unFollowUrl(followingId));
    return response.data
  } catch (error) {
    console.error("[user delete follow ship failed]:", error);
  }
};


// 跟隨，帶入對方id
  export const createFollowShipAPI = async (other_id) => {
    try {
      const response = await axiosInstance.post(followShipsUrl,{
        id:other_id
      });
      return response.data;
    } catch (error) {
      console.error('[User create follow ship failed]: ', error);
    }
  };

  // 取得推薦跟隨名單
  export const getRecommendAPI = async () => {
    try {
      let countData = 10
      const response = await axiosInstance.get(recommendUrL(countData));
      return response.data;
    } catch (error) {
      console.error('[Get recommend failed]: ', error);
    }
  };