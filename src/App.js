import "styles/app.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";

import HomePage from "pages/HomePage";
// user
import { RegisterPage, LoginPage, AdminLoginPage, SettingPage } from "pages";
import { MainPage } from "pages";
// admin
import AdminPage from "pages/AdminPage";

export default function App() {
  return (
    <div className="app">
      <div className="container">
        <AuthProvider>
          <Routes>
            <Route path="*" element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="main" element={<MainPage path="main" />} />
            <Route path="reply" element={<MainPage path="reply" />} />
            <Route path="profile" element={<MainPage path="profile" />}></Route>
            <Route path="follow" element={<MainPage path="follow" />}></Route>
            <Route path="setting" element={<SettingPage />} />
            <Route path="admin_login" element={<AdminLoginPage />} />
            <Route
              path="admin_users"
              element={<AdminPage path="admin_users" />}
            ></Route>
            <Route
              path="admin_tweets"
              element={<AdminPage path="admin_tweets" />}
            ></Route>
          </Routes>
        </AuthProvider>
      </div>
    </div>
  );
}
