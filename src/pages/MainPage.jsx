import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";

import { Navbar, Recommend } from "components";

import "styles/main.css";

export default function MainPage({ path }) {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      logout();
    }
  }, [logout, isAuthenticated]);

  return (
    <div className="main_page">
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
