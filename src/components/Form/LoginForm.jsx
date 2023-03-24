import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'styles/auth_form.css';
import LoginAPI, { loginAPI } from 'api/auth';

export default function LoginForm ({ current_page }){
  const [account,setAccount] = useState('') //帳號
  const [password,setPassword] = useState('') //密碼
  const [errorMessage, setErrorMessage] = useState(['','']) //有錯誤訊息

  function accountChange(value){
    setAccount(value);
  }

  function passwordChange(value){
    setPassword(value);
  }

  // 登入功能
  async function Login(role){
    setErrorMessage(['','']);
    // 資料驗證
    if(account.length <= 0){
      setErrorMessage(['account','帳號欄位必填！']);
      return
    }
    if(password.length <= 0){
      setErrorMessage(['password','密碼欄位必填！']);
      return
    }

    const result = await loginAPI({account, password, role});
    console.log(result);
  }


  return(
    <div className='login_form'>
      <div className='input_group'>
        <FormInput 
          data ={{
            title: '帳號',
            name: 'account' ,
            type: 'text' ,
            placeholder: '請輸入帳號'
          }}
          onChange={accountChange}
          value={account}
          errmsg = {errorMessage}
        />

        <FormInput 
          data={{
            title:'密碼' ,
            name:'password' ,
            type:'password' ,
            placeholder:'請輸入密碼' ,
          }}
          onChange={passwordChange}
          value={password}
          errmsg = {errorMessage}
        />
      </div>
      <button className='submit_btn' onClick={() => {Login(current_page)}}>登入</button>

      {current_page === 'users' ?
        <div className='btn_group'>
          <Link to='/register'>
            <button className='link_btn register_btn'>註冊</button>
          </Link>
          <span>‧</span>
          <Link to='/admin_login'>
            <button className='link_btn admin_login_btn'>後台登入</button>
          </Link>
        </div>
      :
        <div className=''>
          <Link to='/login'>
            <button className='link_btn user_login_btn'>前台登入</button>
          </Link>
        </div>
      }
      
    </div>
  )
}


function FormInput({ data, onChange, value, errmsg }){
  let message = '';

  if(errmsg[0] === data.name){
    message = <label className='error_message' >{errmsg[1]}</label>
  }

  return(
    <div className='input_div'>
      <label htmlFor={data.title}>{data.title}</label>
      <input 
        id={data.title}
        name={data.name} 
        type={data.type} 
        placeholder={data.placeholder} 
        onChange={(e) => {onChange(e.target.value)}}
        value={value}
      />
      {message}
    </div>
  )
}