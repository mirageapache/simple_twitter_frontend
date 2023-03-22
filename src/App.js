import { RegisterPage, LoginPage, AdminLoginPage, MainPage } from 'pages';
import AdminUsersPage from 'pages/admin/AdminUsersPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'styles/app.css';

export default function App() {
  return (
    <div className="app">
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/admin_login' element={<AdminLoginPage />} />
            <Route path='/main' element={<MainPage path='main' />} />
            <Route path='/reply' element={<MainPage path='reply'/>} />
            <Route path='/admin_users' element={<AdminUsersPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

