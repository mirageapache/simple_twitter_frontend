import AccountForm from 'components/Form/AccountForm';


// import style
import 'styles/auth.css';
import { ReactComponent as SvgIconLogo } from 'assets/icons/logo.svg';

export default function Register(){
  return(
    <div className='register'>
      <div className='content'>
        <span className='logo'>
          <SvgIconLogo />
        </span>
        <h3 className='title'>建立你的帳號</h3>
        <AccountForm page='register' />

      </div>
    </div>
  )
}
