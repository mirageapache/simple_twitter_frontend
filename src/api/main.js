import axios from 'axios';
import { baseUrl } from 'api/baseApi.js'

const axiosInstance = axios.create({
    baseUrl: baseUrl,
});

// Check AuthToken
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

// Get TweetList (主頁面-取得推文列表)
export const getTweetListAPI = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/tweets`);
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Get User TweetList (使用者頁面-取得該使用者推文列表)
export const getUserTweetListAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/users/${id}/tweets`);
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Get User LikeList (使用者頁面-取得該使用者喜歡的推文列表)
export const getUserLikeListAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/users/${id}/likes`);
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Get Single Tweet (主頁面-取得單一筆推文資料)
export const getTweetAPI = async (tweet_id) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/tweets/${tweet_id}`);
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Add New Tweet (新增推文)
export const addTweetAPI = async ({description}) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/tweets`,{
      description
    });
    return response;
  } catch (error) {
    console.log(error)
    return error
  }
};

// Get ReplyList (取得推文的回覆列表)
export const getReplyListAPI = async ({ tweet_id }) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/tweets/${tweet_id}/replies`);
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Get User ReplyList (使用者頁面-取得該使用者回覆列表)
export const getUserReplyListAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/users/${id}/replied_tweets`);
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Add New Reply (新增回覆)
export const addReplyAPI = async ({ tweet_id, comment}) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/tweets/${tweet_id}/replies`,{
      comment
    });
    return response;
  } catch (error) {
    console.log(error)
    return error
  }
};

// Get User Account (取得使用者帳號資料)
export const getAccountAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/users/${id}/setting`);
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Edit User Account (修改使用者帳號資料)
export const editAccountAPI = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${baseUrl}/users/${id}/setting`,{
      account: data.account,
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (error) { 
    console.log(error)
    return error
  }
};

// Like Tweet (喜歡推文)
export const LikeTweetAPI = async (id) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/tweets/${id}/like`);
    return response;
  } catch (error) {
    console.log(error)
    return error
  }
};

// Unlike Tweet (取消喜歡推文)
export const UnlikeTweetAPI = async (id) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/tweets/${id}/unlike`);
    return response;
  } catch (error) {
    console.log(error)
    return error
  }
};