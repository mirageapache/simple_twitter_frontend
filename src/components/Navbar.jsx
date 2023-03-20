
// style
import 'styles/navbar.css';
// SVG
import { ReactComponent as IconLogo } from 'assets/icons/logo.svg';
import { ReactComponent as IconHome } from 'assets/icons/home.svg';
import { ReactComponent as IconHomeLight } from 'assets/icons/home_light.svg';
import { ReactComponent as IconUser } from 'assets/icons/user.svg';
import { ReactComponent as IconUserLight } from 'assets/icons/user_light.svg';
import { ReactComponent as IconConfig } from 'assets/icons/config.svg';
import { ReactComponent as IconConfigLight } from 'assets/icons/config_light.svg';
import { ReactComponent as IconLogout } from 'assets/icons/logout.svg';

export default function Navbar(){

  return(
    <div className='navbar'>
      {/* Logo */}
      <div className='logo'>
        <IconLogo />
      </div>
      {/* Item group */}
      <div className='item_group'>
        <NavItem text='首頁' svg_string='home' active='ture'/>
        <NavItem text='個人資料' svg_string='user' active='false'/>
        <NavItem text='設定' svg_string='config' active='false'/>
      </div>
      
      <button className='tweet_btn'>推文</button>

      <div className='logout'>
        <span className='logout_svg'>
          <IconLogout />
        </span>
        <h5 className='logout_text'>登出</h5>
      </div>
    </div>
  )
}


function NavItem({text, svg_string, active}){

  let svg_item;
  switch (svg_string) {
          case 'home':
            svg_item = <IconHome />
            break;
          case 'user':
            svg_item = <IconUserLight />
            break;
          case 'config':
            svg_item = <IconConfigLight />
            break;
          default:
            break;
        }

  return(
    <div className='nav_item' data-active={active}>
      
      <span className='item_svg'>{svg_item}</span>
      <h5 className='item_text'>{text}</h5>
    
    </div>
  )
}