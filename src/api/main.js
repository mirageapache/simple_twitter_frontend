import axios from 'axios';
import { baseUrl } from 'api/baseApi.js'


const token = localStorage.getItem('AuthToken')

// Get TweetList (主頁面-取得推文資料)
export const getTweetListAPI = async () => {
  const result = await axios.get(`${baseUrl}/tweets`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then((res) => { return res.data; })
  .catch((err) => { return err.response.data })
  return result;
};

