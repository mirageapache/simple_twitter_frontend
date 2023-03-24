// import { useState } from "react";
import { Link } from "react-router-dom";
import "styles/auth_form.css";

export default function LoginForm({ current_page }) {
  return (
    <div className="form">
      <div className="input_group">
        <FormInput
          title="帳號"
          name="account"
          type="text"
          placeholder="請輸入帳號"
          value=""
        />
        <FormInput
          title="密碼"
          name="passowrd"
          type="password"
          placeholder="請輸入密碼"
          value=""
        />
      </div>
      <button className="submit_btn">登入</button>

      {current_page === "login" ? (
        <div className="btn_group">
          <Link to="/register">
            <button className="link_btn register_btn">註冊</button>
          </Link>
          <span>‧</span>
          <Link to="/admin_login">
            <button className="link_btn admin_login_btn">後台登入</button>
          </Link>
        </div>
      ) : (
        <div className="btn_group">
          <Link to="/login">
            <button className="link_btn user_login_btn">前台登入</button>
          </Link>
        </div>
      )}
    </div>
  );
}

function FormInput({ title, name, type, placeholder, value }) {
  return (
    <div className="input_div">
      <label htmlFor={title}> {title}</label>
      <input
        id={title}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        // value={value}
      />
    </div>
  );
}
