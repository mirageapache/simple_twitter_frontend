import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'styles/auth_form.css';
import { loginAPI } from 'api/auth';
import Notification from 'components/Form/Notification'

export default function LoginForm ({ current_page }){
  const navigate = useNavigate();
  const [account,setAccount] = useState('') //帳號
  const [password,setPassword] = useState('') //密碼
  const [errorMessage, setErrorMessage] = useState(['','']) //input錯誤訊息
  const [notification, setNotification] = useState(['','']) //通知訊息
  
  function accountChange(value){
    setAccount(value);
  }

  function passwordChange(value){
    setPassword(value);
  }

  // 登入功能
  async function Login(){
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
    
    // fetch Login API
    const result = await loginAPI({account, password, role:current_page});
    
    // 判斷登入是否成功
    if(result.status === 'success'){
      // alert(result.message);
      setNotification(['success','登入成功！']);
      // 將Token 存至localStorage
      localStorage.setItem('AuthToken', result.data.token)
      // 判斷前台登入or後台登入，指向不同頁面
      setTimeout(() => {
        current_page === 'users'? navigate('/main') : navigate('/admin_tweets')
      }, 1500);
    }
    else{
      if(result.message === 'Incorrect password'){
        setErrorMessage('password','帳號或密碼錯誤！')
        alert('帳號或密碼錯誤！')
      }
      if(result.errors.password === 'Password length must be between 5 and 12 characters'){
        alert('密碼長度應為5~12字元！')
      }
      return
    }
  }

  // KeyDown 事件
  function handleKeyDown(key){
    if( key === 'Enter' ){
      Login(current_page);
    }
  }


  return(
    <div className='login_form'>
      {/* 通知訊息 */}
      {notification[0].length > 0 && <Notification type={notification[0]} text={notification[1]} /> }
    
      <div className='input_group'>
        <FormInput 
          data ={{
            title: '帳號',
            name: 'account' ,
            type: 'text' ,
            placeholder: '請輸入帳號'
          }}
          onChange={accountChange}
          onKeyDown={handleKeyDown}
          value={account}
          errmsg = {errorMessage}
        />

        <FormInput 
          data={{
            title:'密碼' ,
            name:'password' ,
            type:'password' ,
            placeholder:'請輸入密碼',
          }}
          onChange={passwordChange}
          onKeyDown={handleKeyDown}
          value={password}
          errmsg = {errorMessage}
        />
      </div>
      <button className='submit_btn' onClick={() => {Login()}}>登入</button>

      {current_page === 'users' ?
        <div className='btn_group'>
          <Link to='/register'>
            <button className='link_btn register_btn'>註冊</button>
          </Link>
          <span>‧</span>
          <Link to="/admin_login">
            <button className="link_btn admin_login_btn">後台登入</button>
          </Link>
        </div>
       : 
        <div className="btn_group">
          <Link to="/login">
            <button className="link_btn user_login_btn">前台登入</button>
          </Link>
        </div>
      }
    </div>
  );
}

function FormInput({ data, onChange, onKeyDown, value, errmsg }){
  let message = '';

  if(errmsg[0] === data.name){
    message = <label className='error_message' >{errmsg[1]}</label>
  }

  return(
    <div className='input_div'>
      <label htmlFor={data.title}>{data.title}</label>
        <input 
          className='input'
          id={data.title}
          name={data.name} 
          type={data.type} 
          placeholder={data.placeholder} 
          onChange={(e) => {onChange(e.target.value)}}
          onKeyDown={(e) => {onKeyDown(e.key)}}
          value={value}
        />
      {message}
    </div>
  );
}
