import axios from 'axios';
import  { userBaseUrl} from "api/baseApi"
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


// Register Method(註冊)
export const AccountAPI = async ({ req_data }) => {

  const result = await axios.post(`${authURL}/users`, {
    account: req_data.account,
    name: req_data.name,
    email: req_data.email,
    password: req_data.password,
    checkPassword: req_data.confirm_password
  }).then((res) => {
    console.log(res.data)
    return res.data;
  }).catch((err => {
    return err.response.data
  }))

  // 回傳至Component
  return result;

};

// 狀態驗證
export const checkLoginStatusAPI = async (authToken) => {
  try {
    const response = await axios.get(`${userBaseUrl}/token`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
    });
    return response.status === 200;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};