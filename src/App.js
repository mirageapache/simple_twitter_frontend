import { useState } from "react";

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "context/AuthContext";
import { TweetProvider } from "context/TweetContext";

import "styles/app.css";
import HomePage from "pages/HomePage";
// user
import { RegisterPage, LoginPage, AdminLoginPage, SettingPage } from "pages";
import { MainPage } from "pages";
import { MainContent, TweetContent } from "components";
import FollowPage from "pages/profile/FollowPage.jsx";
import ProfilePage from "pages/profile/ProfilePage";

// admin
import AdminPage from "pages/AdminPage";
import AdminTweetsPage from "pages/admin/AdminTweetsPage";
import AdminUsersPage from "pages/admin/AdminUsersPage";

export default function App() {
  console.clear();
  const [tweetList, setTweetList] = useState([]);

  return (
    <div className="app">
      <div className="container">
        <AuthProvider>
          <TweetProvider value={{ tweetList, setTweetList }}>
            <Routes>
              <Route path="*" element={<HomePage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />

              <Route path="/" element={<MainPage />}>
                <Route index element={<MainContent />} />
                <Route path="main" element={<MainContent />} />
                <Route path="tweet/:tweet_id" element={<TweetContent />} />
                <Route path="profile/:user_id" element={<ProfilePage />} />
                <Route path="follow" element={<FollowPage />}></Route>
                <Route
                  path="follow/:user_id/followers"
                  element={<FollowPage />}
                ></Route>
                <Route
                  path="follow/:user_id/followings"
                  element={<FollowPage />}
                ></Route>
                <Route path="setting" element={<SettingPage />} />
              </Route>

              <Route path="admin_login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminPage />}>
                <Route index element={<AdminTweetsPage />} />
                <Route path="tweets" element={<AdminTweetsPage />} />
                <Route path="users" element={<AdminUsersPage />} />
              </Route>
            </Routes>
          </TweetProvider>
        </AuthProvider>
      </div>
    </div>
  );
}
