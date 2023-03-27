import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";

import { Navbar, Recommend } from "components";

import "styles/main.css";

export default function MainPage({ path }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="main_page">
      {/* 導覽列 */}
      <section className="nav_section">
        <Navbar />
      </section>

      {pathname === "/main/setting" ? (
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
