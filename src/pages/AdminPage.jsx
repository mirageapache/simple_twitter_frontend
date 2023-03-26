import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

// components
import AdminNavbar from "components/Admin/AdminNavbar";
import AdminTweetsPage from "pages/admin/AdminTweetsPage";
import AdminUsersPage from "pages/admin/AdminUsersPage";

import "styles/admin.css";

export default function AdminPage({ path }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin_login");
    }
  }, [navigate, isAuthenticated]);

  let content;
  if (path === "admin_users") {
    content = <AdminUsersPage />;
  } else if (path === "admin_tweets") content = <AdminTweetsPage />;
  return (
    <div className="admin_page">
      {/* 導覽列 */}
      <section className="admin_nav_section">
        <AdminNavbar />
      </section>
      {/* 內容區塊 */}
      <section className="admin_section">{content}</section>
    </div>
  );
}
