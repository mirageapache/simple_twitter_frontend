import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useNoti } from "context/NotiContext";
import { Navbar, Recommend } from "components";
import Notification from "components/Form/Notification";

import "styles/main.css";

export default function MainPage({ path }) {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { is_alert } = useNoti();

  useEffect(() => {
    if (!isAuthenticated) {
      return logout();
    }
  }, [logout, isAuthenticated]);

  return (
    <div className="main_page">
      {/* 通知訊息*/}
      {is_alert && <Notification />}

      {/* 導覽列 */}
      <section className="nav_section">
        <Navbar />
      </section>

      {pathname === "/setting" ? (
        <Outlet />
      ) : (
        <>
          <section className="content_section">
            <Outlet />
          </section>

          <section className="recommend_section">
            <Recommend />
          </section>
        </>
      )}
    </div>
  );
}
