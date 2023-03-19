import Navbar from 'components/Navbar';
import { BrowserRouter, Routes } from 'react-router-dom';
import 'styles/app.css';

export default function App() {
  return (
    <div className="App">
      <div className='container'>
            <Navbar />
        {/* <BrowserRouter>
          <Routes>
          </Routes>
        </BrowserRouter> */}
      </div>
    </div>
  );
}

