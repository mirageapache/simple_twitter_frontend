import axios from 'axios';

const authURL = 'https://mysterious-reaches-21389.herokuapp.com/api';

// Login Method(前後台登入)
export const loginAPI = async ({ account, password, role }) => {
  // role 用來判斷是前台登入or後台登入
  try {
    const { data } = await axios.post(`${authURL}/${role}/signin`, {
      // headers:{
      //   'x-apikey': '59a7ad19f5a9fa0808f11931',
      //   'Access-Control-Allow-Origin' : '*',
      //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      // },
      account,
      password,
    });

    // 將AuthToken 從data 解構
    const { authToken } = data;
    console.log(data);

    // 登入成功，回傳AuthToken及user資料
    if (authToken) {
      return { success: true, ...data };
    }
    // 登入失敗，回傳失敗訊息
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};