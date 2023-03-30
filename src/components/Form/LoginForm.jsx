import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "styles/auth_form.css";
import { loginAPI } from "api/auth";
import { useAuth } from "context/AuthContext";
import { useNoti } from "context/NotiContext";
import Notification from "components/Form/Notification";

export default function LoginForm({ current_page }) {
  const navigate = useNavigate();
  const { setLoginState } = useAuth();
  const [account, setAccount] = useState(""); //帳號
  const [password, setPassword] = useState(""); //密碼
  const [errorMessage, setErrorMessage] = useState(["", ""]); //input錯誤訊息
  const { is_alert, setIsAlert, setNotiMessage } = useNoti();

  function accountChange(value) {
    setAccount(value);
  }

  function passwordChange(value) {
    setPassword(value);
  }

  // 登入功能
  async function Login() {
    setErrorMessage(["", ""]);
    // 資料驗證
    if (account.length <= 0) {
      setErrorMessage(["account", "帳號欄位必填！"]);
      return;
    }
    if (password.length <= 0) {
      setErrorMessage(["password", "密碼欄位必填！"]);
      return;
    }

    // fetch Login API
    const result = await loginAPI({ account, password, role: current_page });
    if (result.status === 200) {
      localStorage.setItem("AuthToken", result.data.data.token);
      setLoginState(true);
      setNotiMessage({ type: "success", message: "登入成功！" });
      setIsAlert(true);
      current_page === "users" ? navigate("/main") : navigate("/admin");
    } else {
      setLoginState(false);
      setIsAlert(true); //顯示錯誤通知
      if (result.response.status === 400) {
        setErrorMessage(["password", "密碼長度應為5~12字元！"]);
        setNotiMessage({ type: "error", message: "密碼長度應為5~12字元！" });
      } else if (result.response.status === 401) {
        setErrorMessage(["password", "密碼錯誤！"]);
        setNotiMessage({ type: "error", message: "密碼錯誤！" });
      } else if (result.response.status === 404) {
        setErrorMessage(["account", "帳號未註冊！"]);
        setNotiMessage({ type: "error", message: "帳號未註冊！" });
      } else if (result.response.status === 500) {
        setNotiMessage({
          type: "info",
          message: "伺服器流量過載！請稍後再試！",
        });
      }
      return;
    }
  }

  // KeyDown 事件
  function handleKeyDown(key) {
    if (key === "Enter") {
      Login(current_page);
    }
  }

  return (
    <div className="login_form">
      <div className="input_group">
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
          errmsg={errorMessage}
        />

        <FormInput
          data={{
            title: "密碼",
            name: "password",
            type: "password",
            placeholder: "請輸入密碼",
          }}
          onChange={passwordChange}
          onKeyDown={handleKeyDown}
          value={password}
          errmsg={errorMessage}
        />
      </div>
      <button
        className="submit_btn"
        onClick={() => {
          Login();
        }}
      >
        登入
      </button>

      {current_page === "users" ? (
        <div className="btn_group">
          <NavLink to="/register">
            <button className="link_btn register_btn">註冊</button>
          </NavLink>
          <span>‧</span>
          <NavLink to="/admin_login">
            <button className="link_btn admin_login_btn">後台登入</button>
          </NavLink>
        </div>
      ) : (
        <div className="btn_group">
          <NavLink to="/login">
            <button className="link_btn user_login_btn">前台登入</button>
          </NavLink>
        </div>
      )}

      {/* 通知訊息 */}
      {is_alert && <Notification />}
    </div>
  );
}

function FormInput({ data, onChange, onKeyDown, value, errmsg }) {
  let input_style = "input"; 
  let message = "";
  if (errmsg[0] === data.name) {
    input_style = "input_error";
    message = <label className="error_message">{errmsg[1]}</label>;
  }

  return (
    <div className="input_div">
      <label htmlFor={data.title}>{data.title}</label>
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
      {message}
    </div>
  );
}
