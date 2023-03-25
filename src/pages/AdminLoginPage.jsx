import LoginForm from "components/Form/LoginForm";

// import style
import "styles/auth.css";
import { ReactComponent as SvgIconLogo } from "assets/icons/logo.svg";

export default function AdminLogin() {
  return (
    <div className="admin_login">
      <div className="content">
        <span className="logo">
          <SvgIconLogo />
        </span>
        <h3 className="title">登入後台</h3>
        <LoginForm current_page="admin_login" />
      </div>
    </div>
  );
}
