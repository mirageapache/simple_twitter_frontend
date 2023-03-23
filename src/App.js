<<<<<<< HEAD
import { RegisterPage, LoginPage, AdminLoginPage, SettingPage } from 'pages';
import { MainPage } from 'pages';
import { FollowPage } from 'pages';
import { AdminUsersPage, AdminTweetsPage } from 'pages'
import { Route, Routes } from 'react-router-dom';
=======
import { RegisterPage, LoginPage, AdminLoginPage, MainPage } from 'pages';
import AdminUsersPage from 'pages/admin/AdminUsersPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
>>>>>>> reply_page
import 'styles/app.css';

export default function App() {
  return (
    <div className="app">
      <div className='container'>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/admin_login' element={<AdminLoginPage />} />
<<<<<<< HEAD
            <Route path='/setting' element={<SettingPage />} />
            <Route path='/main' element={<MainPage />} />
=======
            <Route path='/main' element={<MainPage path='main' />} />
            <Route path='/reply' element={<MainPage path='reply'/>} />
>>>>>>> reply_page
            <Route path='/admin_users' element={<AdminUsersPage />}></Route>
            <Route path='/admin_tweets' element={<AdminTweetsPage />}></Route>
            <Route path="/follow" element={<FollowPage />}></Route>
          </Routes>
      </div>
    </div>
  );
}

