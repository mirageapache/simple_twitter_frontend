// react
import { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";

// api
import { getAdminUsersAPI } from "api/adminApi";

// style
import "styles/AdminUsers.css";

// components
import AdminUsersList from "components/Admin/AdminUsersList";
import LoadingMes from "components/LoadingMes";

function AdminTweetsPage() {
  const { isAuthenticated, logout } = useAuth();

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      return logout();
    } else {
      const getUsersData = async () => {
        try {
          // 篩出user，排序依照推文數大>小
          let rawUsersData = await getAdminUsersAPI();
          let usersData = rawUsersData.filter((item) => item.role === "user");
          usersData.sort(
            (pre, next) => next["tweet_count"] - pre["tweet_count"]
          );
          setUsersData(usersData);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      getUsersData();
    }
  }, [isAuthenticated, logout, usersData]);

  return (
    <div className="admin-tweets">
      <h4 className="admin-page-title">使用者列表</h4>
      {loading ? <LoadingMes /> : <AdminUsersList usersData={usersData} />}
    </div>
  );
}
export default AdminTweetsPage;
