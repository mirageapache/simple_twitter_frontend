import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";

import { Navbar, Recommend } from "components";

import "styles/main.css";

export default function MainPage({ path }) {
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  // console.log("pathname", pathname);

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
