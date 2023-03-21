// import {Navbar, Recommend} from 'components';
import { RegisterPage, LoginPage } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'styles/app.css';

export default function App() {
  return (
    <div className="App">
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

