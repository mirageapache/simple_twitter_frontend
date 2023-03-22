import { NavLink } from "react-router-dom";
// style
import "styles/navbar.css";

// SVG
import { ReactComponent as IconLogo } from "assets/icons/logo.svg";
// import { ReactComponent as IconHome } from "assets/icons/home.svg";
import { ReactComponent as IconHomeLight } from "assets/icons/home_light.svg";
import { ReactComponent as IconUser } from "assets/icons/user.svg";
// import { ReactComponent as IconUserLight } from "assets/icons/user_light.svg";
import { ReactComponent as IconLogout } from "assets/icons/logout.svg";

function NavItem({ text, pathState, active }) {
  let svg_item;
  let routePath;
  switch (pathState) {
    case "tweets":
      svg_item = <IconHomeLight />;
      routePath = "/admin_tweets";
      break;
    case "users":
      svg_item = <IconUser />;
      routePath = "admin_users";
      break;
    default:
      break;
  }

  return (
    <NavLink className="nav_item" data-active={active} to={routePath}>
      <span className="item_svg">{svg_item}</span>
      <h5 className="item_text">{text}</h5>
    </NavLink>
  );
}

function AdminNavbar() {
  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <IconLogo />
      </div>
      {/* Item group */}
      <div className="item_group">
        <NavItem text="推文清單" pathState="tweets" active="true" />
        <NavItem text="使用者列表" pathState="users" active="false" />
      </div>

      <div className="logout">
        <span className="logout_svg">
          <IconLogout />
        </span>
        <h5 className="logout_text">登出</h5>
      </div>
    </div>
  );
}
export default AdminNavbar;
