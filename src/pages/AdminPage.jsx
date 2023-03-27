import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";

// components
import AdminNavbar from "components/Admin/AdminNavbar";

import "styles/admin.css";

export default function AdminPage({ path }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin_login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="admin_page">
      {/* 導覽列 */}
      <section className="admin_nav_section">
        <AdminNavbar />
      </section>
      {/* 內容區塊 */}
      <section className="admin_section">
        <Outlet />
      </section>
    </div>
  );
}
