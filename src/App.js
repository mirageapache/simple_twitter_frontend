import 'styles/app.css';
import { Route, Routes } from 'react-router-dom';
// user
import { RegisterPage, LoginPage, AdminLoginPage, 
  // SettingPage
 } from 'pages';
import { MainPage } from 'pages';
import FollowPage from "pages/FollowPage.jsx";
import ProfilePage from 'pages/ProfilePage';
import AdminPage from 'pages/AdminPage';



export default function App() {
  return (
    <div className="app">
      <div className='container'>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/admin_login' element={<AdminLoginPage />} />
            <Route path='/main' element={<MainPage path='main' />} />
            <Route path='/reply' element={<MainPage path='reply'/>} />
            <Route path='/admin_users' element={<AdminPage path='admin_users'/>}></Route>
            <Route path='/admin_tweets' element={<AdminPage path='admin_tweets'/>}></Route>
            <Route path="/follow" element={<FollowPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
          </Routes>
      </div>
    </div>
  );
}