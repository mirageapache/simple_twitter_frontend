import axios from 'axios';

const apiURL = 'https://mysterious-reaches-21389.herokuapp.com/api';

// Register Method(註冊)
export const AccountAPI = async ( {account, name, email, password, checkPassword} ) => {

  console.log(account)
  try {
    const { result } = await axios.post(`${apiURL}/users`, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
    console.log(result);

    // 登入成功，回傳AuthToken及user資料
    // if (result.status) {
    //   return { success: true, ...result };
    // }
    // 登入失敗，回傳失敗訊息
    return result;
  } catch (error) {
    console.error('error',error);
    return error;
  }
};