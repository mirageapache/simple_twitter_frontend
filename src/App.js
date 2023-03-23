import 'styles/app.css';
import { Route, Routes } from 'react-router-dom';
// user
import { RegisterPage, LoginPage, AdminLoginPage, SettingPage } from 'pages';
import { MainPage } from 'pages';
import FollowPage from "pages/FollowPage.jsx";
// admin
// import AdminNavbar from "components/Admin/AdminNavbar.jsx";
import AdminTweetsPage from'pages/admin/AdminTweetsPage'
import AdminUsersPage from'pages/admin/AdminUsersPage'



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
            <Route path='/admin_users' element={<AdminUsersPage />}></Route>
            <Route path='/admin_tweets' element={<AdminTweetsPage />}></Route>
            <Route path="/follow" element={<FollowPage />}></Route>
          </Routes>
      </div>
    </div>
  );
}