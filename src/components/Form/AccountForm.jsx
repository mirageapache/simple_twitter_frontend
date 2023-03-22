import { useState } from "react";
import { Link } from "react-router-dom";
import "styles/auth_form.css";

export default function AccountForm() {
  const [accout, setAccount] = useState();

  return (
    <div className="form">
      <div className="input_group">
        <FormInput
          title="帳號"
          name="account"
          type="text"
          placeholder="請輸入帳號"
          value={accout}
        />
        <FormInput
          title="名稱"
          name="name"
          type="text"
          placeholder="請輸入使用者名稱"
        />
        <FormInput
          title="Email"
          name="email"
          type="email"
          placeholder="請輸入Email"
        />
        <FormInput
          title="密碼"
          name="passowrd"
          type="password"
          placeholder="請設定密碼"
        />
        <FormInput
          title="密碼確認"
          name="confirm_password"
          type="password"
          placeholder="請再次輸入密碼"
        />
      </div>
      <button className="submit_btn">註冊</button>

      <Link to="/login">
        <button className="link_btn cancel_btn">取消</button>
      </Link>
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
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
