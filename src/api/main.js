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



// Get TweetList (主頁面-取得推文資料)
export const getTweetListAPI = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/tweets`);
    return response.data;
  } catch (error) { 
    return error
  }
};

// Get Single Tweet (主頁面-取得單一筆推文資料)
export const getTweetAPI = async (tweet_id) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/tweets/${tweet_id}`);
    return { status: 200, data: {...response.data} };
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
    return response.data;
  } catch (error) {
    return error
  }
};


// Get ReplyList (取得推文的回覆列表)
export const getReplyListAPI = async ({ tweet_id }) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/tweets/${tweet_id}/replies`);
    return response.data;
  } catch (error) { 
    return error
  }
};

// Add New Reply (新增回覆)
export const addReplyAPI = async ({ tweet_id, comment}) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/tweets/${tweet_id}/replies`,{
      comment
    });
    console.log(response)
    return response;
  } catch (error) {
    return error
  }
};