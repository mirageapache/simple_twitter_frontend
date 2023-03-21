// import {Navbar, Recommend} from 'components';
import { RegisterPage, LoginPage, AdminLoginPage, MainPage } from 'pages';
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
            <Route path='/main' element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

