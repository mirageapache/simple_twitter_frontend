import axios from 'axios';
import { baseUrl } from 'api/baseApi.js'

// Login Method(前後台登入)
export const loginAPI = async ({ account, password, role }) => {
  // role 用來判斷是前台登入or後台登入
  const result = await axios.post(`${baseUrl}/${role}/signin`, {
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
  const result = await axios.post(`${baseUrl}/users`, {
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