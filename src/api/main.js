import axios from 'axios';
import { baseUrl } from 'api/baseApi.js'

// Get TweetList (主頁面取得推文資料)
export const getTweetListAPI = async () => {
  const token = localStorage.getItem('AuthToken')

  const result = await axios.get(`${baseUrl}/tweets`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.data;
  }).catch((err => {
    return err.response.data
  }))

  // 回傳至Component
  return result;
};
