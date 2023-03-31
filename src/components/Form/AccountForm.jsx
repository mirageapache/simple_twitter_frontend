import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RegisterAPI } from "api/auth";
import { editAccountAPI } from "api/main";
import "styles/auth_form.css";
import { useAuth } from "context/AuthContext";
import Notification from "components/Form/Notification";
import { useNoti } from "context/NotiContext";

// email 驗證規則
const email_rule =
  /^\w+((-\w+)|(.\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z]+$/;

export default function AccountForm({ userData, current_page }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessate] = useState(["", ""]);
  const { currentMember } = useAuth();
  const { is_alert, setIsAlert, setNotiMessage } = useNoti();

  useEffect(() => {
    // Setting 設定帳號資料
    if (userData !== undefined && current_page === "setting") {
      setAccount(userData.account);
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData, current_page]);

  function accountChange(value) {
    setErrorMessate(["", ""]);
    setAccount(value);
    if (account.length >50) {
      setNotiMessage({type:"error", message:"帳號字數上限為50字！"});
      setErrorMessate(["account", "帳號字數上限為50字！"]);
      return false;
    }
  }

  function nameChange(value) {
    setErrorMessate(["", ""]);
    setName(value);
    if (value.length > 50) {
      setErrorMessate(["name", "名稱字數上限為50字！"]);
    }
  }

  function emailChange(value) {
    setErrorMessate(["", ""]);
    setEmail(value);
  }

  function passwordChange(value) {
    setErrorMessate(["", ""]);
    setPassword(value);
  }

  function confirmPasswordChange(value) {
    setErrorMessate(["", ""]);
    setConfirmPassword(value);
  }

  // 資料驗證
  function checkData() {
    if (account.length === 0) {
      setNotiMessage({ type: "error", message: "帳號欄位必填！" });
      setErrorMessate(["account", "帳號欄位必填！"]);
      return false;
    }
    if (account.length >50) {
      setNotiMessage({type:"error", message:"帳號字數上限為50字！"});
      setErrorMessate(["account", "帳號字數上限為50字！"]);
      return false;
    }
    if (name.length === 0) {
      setErrorMessate(["name", "名稱欄位必填！"]);
      setNotiMessage({ type: "error", message: "名稱欄位必填！" });
      return false;
    }
    if (name.length > 50) {
      setErrorMessate(["name", "名稱字數上限為50字！"]);
      setNotiMessage({ type: "warning", message: "名稱字數上限為50字！" });
      return false;
    }
    if (email.length === 0) {
      setErrorMessate(["email", "Email欄位必填！"]);
      setNotiMessage({ type: "error", message: "Email欄位必填！" });
      return false;
    }
    if (email.search(email_rule) === -1) {
      setErrorMessate(["email", "Email格式不正確！"]);
      setNotiMessage({ type: "error", message: "Email格式不正確！" });
      return false;
    }
    if (password.length === 0) {
      setErrorMessate(["password", "密碼欄位必填！"]);
      setNotiMessage({ type: "error", message: "密碼欄位必填！" });
      return false;
    }
    if (password.length <5 || password.length > 12) {
      setErrorMessate(["password", "密碼長度應為5~12字元！"]);
      setNotiMessage({type:"error", message:"密碼長度應為5~12字元！"});
      return false;
    }
    if (confirm_password.length === 0) {
      setErrorMessate(["confirm_password", "確認密碼欄位必填！"]);
      setNotiMessage({ type: "error", message: "確認密碼欄位必填！" });
      return false;
    }
    if (confirm_password !== password) {
      setErrorMessate(["confirm_password", "確認密碼與密碼不相符！"]);
      setNotiMessage({ type: "error", message: "確認密碼與密碼不相符！" });
      return false;
    }
    return true;
  }

  // 註冊功能 (RegisterPage)
  async function Register() {
    setErrorMessate(["", ""]);
    const is_check = checkData();
    if (is_check) {
      const req_data = { account, name, email, password, confirm_password };
      // fetch API 事件
      const result = await RegisterAPI({ req_data });
      // 判斷登入是否成功
      if (result.status === 200) {
        setNotiMessage({type:"success", message:"註冊成功！"});
        setIsAlert(true);
        // 導向登入頁
        navigate("/login");
      } else {
        if (result.response.data.message === "Existing email or user account") {
          setNotiMessage({type:"error", message:"帳號或Email已存在！"});
          setIsAlert(true);
        }
        if (result.response.data.message === "Confirm password is incorrect") {
          setNotiMessage({type:"error", message:"確認密碼與密碼不相符！"});
          setIsAlert(true);
        }
        if (
          result.response.data.message ===
          "Password length must be between 5 and 12 characters"
        ) {
          setNotiMessage({type:"error", message:"密碼長度應為5~12字元！"});
          setIsAlert(true);
        }
        setIsAlert(true);
        return;
      }
    }
    else{
      setIsAlert(true);
    }
  }

  // 設定帳號 (SettingPage)
  async function Setting() {
    setErrorMessate(["", ""]);
    const is_check = checkData();
    if (is_check) {
      const req_data = { account, name, email, password, confirm_password };
      // fetch API 事件
      const result = await editAccountAPI(currentMember.id, req_data);
      // 判斷登入是否成功
      if (result.status === 200) {
        const new_data = result.data.data.user;
        setNotiMessage({type:"success", message:"修改成功！"});
        setIsAlert(true);
        setPassword('')
        setConfirmPassword('')
        setAccount(new_data.account)
        setName(new_data.name)
        setEmail(new_data.email)
       
      } else {
        if (result.response.data.message === "Existing email or user account") {
          setNotiMessage({type:"error", message:"帳號或Email已存在！"});
          setIsAlert(true);
        }
        if (result.response.data.message === "Confirm password is incorrect") {
          setNotiMessage({type:"error", message:"確認密碼與密碼不相符！"});
          setIsAlert(true);
        }
        if (
          result.response.data.message ===
          "Password length must be between 5 and 12 characters"
        ) {
          setNotiMessage({type:"error", message:"密碼長度應為5~12字元！"});
          setIsAlert(true);
        }
        setIsAlert(true);
        return;
      }
    }
    else{
      setIsAlert(true);
    }
  }

  // KeyDown 事件
  function handleKeyDown(key) {
    if (key === "Enter") {
      current_page === "register" ? Register() : Setting();
    }
  }

  return (
    <div className="account_form">
      <div className="input_group">
        {/* Account */}
        <FormInput
          data={{
            title: "帳號",
            name: "account",
            type: "text",
            placeholder: "請輸入帳號",
          }}
          onChange={accountChange}
          onKeyDown={handleKeyDown}
          value={account}
          err_msg={errorMessage}
        />

        {/* Name */}
        <FormInput
          data={{
            title: "名稱",
            name: "name",
            type: "text",
            placeholder: "請輸入使用者名稱",
          }}
          onChange={nameChange}
          onKeyDown={handleKeyDown}
          value={name}
          err_msg={errorMessage}
        />

        {/* Email */}
        <FormInput
          data={{
            title: "Email",
            name: "email",
            type: "email",
            placeholder: "請輸入Email",
          }}
          onChange={emailChange}
          onKeyDown={handleKeyDown}
          value={email}
          err_msg={errorMessage}
        />

        {/* Passowrd */}
        <FormInput
          data={{
            title: "密碼",
            name: "password",
            type: "password",
            placeholder: "請設定密碼",
          }}
          onChange={passwordChange}
          onKeyDown={handleKeyDown}
          value={password}
          err_msg={errorMessage}
        />

        {/* Confirm Password */}
        <FormInput
          data={{
            title: "確認密碼",
            name: "confirm_password",
            type: "password",
            placeholder: "請再次輸入密碼",
          }}
          onChange={confirmPasswordChange}
          onKeyDown={handleKeyDown}
          value={confirm_password}
          err_msg={errorMessage}
        />
      </div>

      {current_page === "register" ? (
        <div className="register_btn_div">
          <button className="submit_btn" onClick={Register}>
            註冊
          </button>
          <NavLink to="/login">
            <button className="cancel_btn">取消</button>
          </NavLink>
        </div>
      ) : (
        <div className="setting_btn_div">
          <button className="edit_btn" onClick={Setting}>
            儲存
          </button>
        </div>
      )}

      {/* 通知訊息*/}
      {is_alert && <Notification />}
    </div>
  );
}

function FormInput({ data, onChange, onKeyDown, value, err_msg }) {
  let input_style = "input"; //正常的input樣式
  let message = ""; //錯誤訊息

  if (err_msg[0] === data.name) {
    input_style = "input_error"; //有error時修改樣式
    message = <label className="error_message">{err_msg[1]}</label>;
  }

  return (
    <div className="input_div">
      <label htmlFor={data.title}> {data.title}</label>
      <input
        className={input_style}
        id={data.title}
        name={data.name}
        type={data.type}
        placeholder={data.placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          onKeyDown(e.key);
        }}
        value={value}
      />
      {/* 錯誤訊息 */}
      {message}
    </div>
  );
}
