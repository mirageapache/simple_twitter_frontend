import LoginForm from 'components/Form/LoginForm'
import { useNavigate } from 'react-router-dom';


// import style
import 'styles/auth.css';
import { ReactComponent as SvgIconLogo } from 'assets/icons/logo.svg';

export default function Register(){
  const navigate = useNavigate();

  // 註冊 onclick eventhandle

  return(
    <div className='login'>
      <div className='content'>
        <span className='logo'>
          <SvgIconLogo />
        </span>
        <h3 className='title'>登入 Alphitter</h3>
        <LoginForm current_page='login'/>

      </div>
    </div>
  )
}
