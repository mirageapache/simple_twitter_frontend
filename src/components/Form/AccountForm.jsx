import { AccountAPI } from 'api/auth';
import { useState } from 'react';
import 'styles/auth_form.css';

const email_rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

export default function AccountForm ({ current_page }){
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessate] = useState(['','']);

  function accountChange(value){
    setErrorMessate(['','']);
    setAccount(value);
  }
  
  function nameChange(value){
    setErrorMessate(['','']);
    setName(value);
    if(value.length > 50){
      setErrorMessate(['name','名稱字數上限為50字！'])
    }
  }
  
  function emailChange(value){
    setErrorMessate(['','']);
    setEmail(value);
  }
  
  function passwordChange(value){
    setErrorMessate(['','']);
    setPassword(value);
  }
  
  function confirmPasswordChange(value){
    setErrorMessate(['','']);
    setConfirmPassword(value);
  }

  // 註冊 or 修改帳號資料
  async function handleAccount(){
    setErrorMessate(['','']);
    // 資料驗證
    if(account.length === 0){
      setErrorMessate(['account','帳號欄位必填！']);
      return
    }
    if(name.length === 0){
      setErrorMessate(['name','名稱欄位必填！']);
      return
    }
    if(name.length > 50){
      setErrorMessate(['name','名稱字數上限為50字！']);
      return
    }
    if(email.length === 0){
      setErrorMessate(['email','Email欄位必填！']);
      return
    }
    if(email.search(email_rule) === -1){
      setErrorMessate(['email','Email格式不正確！']);
      return
    }
    if(password.length === 0){
      setErrorMessate(['password','密碼欄位必填！']);
      return
    }
    if(confirm_password.length === 0){
      setErrorMessate(['confirm_password','確認密碼欄位必填！']);
      return
    }
    if(confirm_password !== password){
      setErrorMessate(['confirm_password','確認密碼與密碼不相符！']);
      return
    }

    // const req_data = {account, name, email, password, confirm_password}
    // fetch API 事件
    const success = await AccountAPI({account, name, email, password, confirm_password});
    console.log(success)
  }

  // KeyDown 事件
  function handleKeyDown(key){
    if(key === 'Enter'){ handleAccount(); }
  }


  return(
    <div className='form'>
      <div className='input_group'>
        {/* Account */}
        <FormInput 
          data={{ 
            title:'帳號',
            name:'account' ,
            type:'text' ,
            placeholder:'請輸入帳號'
          }} 
          onChange={accountChange}
          value={account} 
          err_msg={errorMessage}
        />

        {/* Name */}
        <FormInput 
          data={{
            title:'名稱' ,
            name:'name' ,
            type:'text' ,
            placeholder:'請輸入使用者名稱' 
          }}
          onChange={nameChange}
          value={name}
          err_msg={errorMessage}
        />

        {/* Email */}
        <FormInput 
          data={{
            title:'Email' ,
            name:'email' ,
            type:'email' ,
            placeholder:'請輸入Email'
          }}
          onChange={emailChange}
          value={email} 
          err_msg={errorMessage}
        />

        {/* Passowrd */}
        <FormInput 
          data={{
            title:'密碼' ,
            name:'password' ,
            type:'password' ,
            placeholder:'請設定密碼' 
          }}
          onChange={passwordChange}
          value={password}
          err_msg={errorMessage}
        />

        {/* Confirm Password */}
        <FormInput 
          data={{
            title:'密碼確認' ,
            name:'confirm_password' ,
            type:'password' ,
            placeholder:'請再次輸入密碼' 
          }}
          onChange={confirmPasswordChange}
          onKeyDown={handleKeyDown}
          value={confirm_password}
          err_msg={errorMessage}
        />

      </div>
      <button className='submit_btn' onClick={handleAccount}>註冊</button>
      <button className='cancel_btn'>取消</button>
    </div>
  )
}


function FormInput({ data, onChange, onKeyDown, value, err_msg}){
  let input_style= 'input'; //正常的input樣式
  let message = '' //錯誤訊息

  if(err_msg[0] === data.name){
    input_style = 'input_error' //有error時修改樣式
    message = <label className='err_msg'>{err_msg[1]}</label>
  }

  return(
    <div className='input_div'>
      <label htmlFor={data.title}> {data.title}</label>

      {data.name === 'confirm_password'?
        // 是confrim password 在input多加keypress事件
        <input 
          className={input_style}
          id={data.title}
          name={data.name} 
          type={data.type} 
          placeholder={data.placeholder} 
          onChange={(e) => {onChange(e.target.value)}}
          onKeyDown={(e) => {onKeyDown(e.key)}}
          value={value}
        />
      :
        // 正常的input
        <input 
          className={input_style}
          id={data.title}
          name={data.name} 
          type={data.type} 
          placeholder={data.placeholder} 
          onChange={(e) => {onChange(e.target.value)}}
          value={value}
        />
      }
      {/* 錯誤訊息 */}
      {message}
    </div>
  )
}