import "styles/app.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import { TweetProvider } from "context/TweetContext";
import { ReplyProvider } from "context/ReplyContext";
import HomePage from "pages/HomePage";
// user
import { RegisterPage, LoginPage, AdminLoginPage, SettingPage } from "pages";
import { MainPage } from "pages";
// admin
import AdminPage from "pages/AdminPage";

export default function App() {
  console.clear()
  return (
    <div className="app">
      <div className="container">
        <AuthProvider>
          <TweetProvider>
            <ReplyProvider>
              <Routes>
                <Route path="*" element={<HomePage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                  <Route path="main" element={<MainPage path="main" />} />
                  <Route path="tweet/:tweet_id" element={<MainPage path="tweet" />} />
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
            </ReplyProvider>
          </TweetProvider>
        </AuthProvider>
      </div>
    </div>
  );
}
