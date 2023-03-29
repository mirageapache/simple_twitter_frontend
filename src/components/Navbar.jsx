import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useNoti } from "context/NotiContext";

// style
import "styles/navbar.css";
// SVG
import { ReactComponent as IconLogo } from "assets/icons/logo.svg";
import { ReactComponent as IconHome } from "assets/icons/home.svg";
import { ReactComponent as IconHomeLight } from "assets/icons/home_light.svg";
import { ReactComponent as IconUser } from "assets/icons/user.svg";
import { ReactComponent as IconUserLight } from "assets/icons/user_light.svg";
import { ReactComponent as IconConfig } from "assets/icons/config.svg";
import { ReactComponent as IconConfigLight } from "assets/icons/config_light.svg";
import { ReactComponent as IconLogout } from "assets/icons/logout.svg";

import TweetModal from "./Main/TweetModal";

export default function Navbar() {
  const { logout, currentMember } = useAuth();
  const [selfId, setSelfId] = useState(null);
  const [activeitem, setActiveItem] = useState('main');
  const [modal_toggle, setModalToggle] = useState(false);
  const { setIsAlert, setNotiMessage } = useNoti();

  // 這段要確認一下
  useEffect(() => {
    const checkSelf = async () => {
      const currentMemberId = await currentMember.id;
      if (!currentMemberId) {
        return logout();
      }
      setSelfId(Number(currentMemberId));
    };

    checkSelf();
  }, []);


  function onModalToggle() {
    setModalToggle(!modal_toggle);
  }

  // 登出事件
  const handleClick = () => {
    setNotiMessage({type:"info", message:"您已登出系統！"});
    setIsAlert(true);
    logout();
  };


  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <IconLogo />
      </div>
      {/* Item group */}
      <div className="item_group">
        <NavItem text="首頁" svg_string="home" active={activeitem} setActive={()=>{setActiveItem('main')}} />
        <NavItem
          text="個人資料"
          svg_string="user"
          active={activeitem}
          selfId={selfId}
          setActive={()=>{setActiveItem('profile')}}
        />
        <NavItem text="設定" svg_string="config" active={activeitem} setActive={()=>{setActiveItem('setting')}} />
      </div>

      <button className="tweet_btn" onClick={onModalToggle}>
        推文
      </button>
      {modal_toggle && <TweetModal onModalToggle={onModalToggle} />}

      {/* 登出 */}
      <div className="logout">
        <span className="logout_svg">
          <IconLogout />
        </span>
        <h5 className="logout_text" onClick={handleClick}>
          登出
        </h5>
      </div>
    </div>
  );
}

function NavItem({ text, svg_string, active, selfId , setActive}) {
  let style = 'nav_item';
  let svg_item;
  let routePath;

  switch (svg_string) {
    case "home":
      if(active === 'main'){
        svg_item = <IconHome />
        style = 'nav_item active'
      }else{
        svg_item = <IconHomeLight />
      }
      routePath = "main";
      break;
    case "user":
      if(active === 'profile'){
        svg_item = <IconUser />
        style = 'nav_item active'
      }else{
        svg_item = <IconUserLight />
      }
      routePath = `profile/${selfId}`;
      break;
    case "config":
      if(active === 'setting'){
        svg_item = <IconConfig />
        style = 'nav_item active'
      }else{
        svg_item = <IconConfigLight />
      }
      routePath = "setting";
      break;
    default:
      break;
  }

  return (
    <NavLink className={style} to={routePath} onClick={setActive}>
      <span className="item_svg">{svg_item}</span>
      <h5 className="item_text">{text}</h5>
    </NavLink>
  );
}
