// react
import { useState, useEffect } from "react";

// api
import { getAdminUsersAPI } from "api/adminApi";

// style
import "styles/AdminUsers.css";

// components
import AdminUsersList from "components/Admin/AdminUsersList";
import LoadingMes from "components/LoadingMes";

function AdminTweetsPage() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        // 篩出user，排序依照推文數大>小
        let rawUsersData = await getAdminUsersAPI();
        let usersData = rawUsersData.filter((item) => item.role === "user");
        usersData.sort((pre, next) => next["tweet_count"] - pre["tweet_count"]);
        setUsersData(usersData);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getUsersData();
  }, []);

  return (
    <div className="admin-tweets">
      <h4 className="admin-page-title">使用者列表</h4>
      {loading ? <AdminUsersList usersData={usersData} /> : <LoadingMes />}
    </div>
  );
}
export default AdminTweetsPage;
