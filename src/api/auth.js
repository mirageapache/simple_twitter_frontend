import axios from 'axios';

const authURL = 'https://mysterious-reaches-21389.herokuapp.com/api';

// Login Method(前後台登入)
export const loginAPI = async ({ account, password, role }) => {
  // role 用來判斷是前台登入or後台登入
  const result = await axios.post(`${authURL}/${role}/signin`, {
    account,
    password
  }).then((res) => {
    console.log(res.data)
    return res.data;
  }).catch((err => {
    return err.response.data
  }))

  // 回傳至Component
  return result;

};