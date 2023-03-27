import axios from "axios";

import { baseUrl,userUrl } from "api/baseApi";

const userFollowersUrl = (user_id) => `${userUrl(`${user_id}`)}/followers`;
const userFollowingsUrl = (user_id) => `${userUrl(`${user_id}`)}/followings`;

// const followShipsUrl = `${baseUrl}/followships`
// const followShipUrl =(following_id) => `${followShipsUrl}/${following_id}`

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
      console.log("getFollowersDataAPI" , userFollowersUrl(user_id))
        const response = await axiosInstance.get(userFollowersUrl(user_id));
        return response.data;
      } catch (error) {
        console.error("[User get self like data failed]: ", error);
      }
}


export const getFollowingsDataAPI =async(user_id)=>{
  try {
    console.log("getFollowingsDataAPI" , userFollowingsUrl(user_id))
      const response = await axiosInstance.get(userFollowingsUrl(user_id));
      return response.data;
    } catch (error) {
      console.error("[User get self like data failed]: ", error);
    }
}


// // 跟隨
// export const createFollowShipAPI = async (payload) => {
//     // 要確認需要帶入什麼資料傳送
//     const { data } = payload;
//     try {
//       const res = await axiosInstance.post(followShipsUrl, {
//         data,
//       });
//       return res.data;
//     } catch (error) {
//       console.error('[User create follow ship failed]: ', error);
//     }
//   };

// // 刪除跟隨
// export const delFollowShipAPI = async (following_id) => {
//     try {
//       const res = await delete followShipUrl(following_id);
//       return res.data;
//     } catch (error) {
//       console.error("[user delete follow ship failed]:", error);
//     }
//   };
  