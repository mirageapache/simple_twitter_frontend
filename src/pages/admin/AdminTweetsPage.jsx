import { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";
import { useNoti } from "context/NotiContext";
// style
import "styles/AdminTweets.css";

// components
import AdminTweetsList from "components/Admin/AdminTweetsList";
import LoadingMes from "components/LoadingMes";
// api
import { getAdminTweetsAPI, delAdminTweetAPI } from "api/adminApi";

function AdminTweetsPage() {
  const { isAuthenticated, logout } = useAuth();
  const [tweetsData, setTweetsData] = useState([]);
  const { setIsAlert, setNotiMessage } = useNoti();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      return logout();
    } else {
      const getTweetsData = async () => {
        try {
          const rawTweetsData = await getAdminTweetsAPI();
          setTweetsData(rawTweetsData);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      getTweetsData();
    }
  }, [isAuthenticated, logout]);

  const handleDelete = async (id) => {
    let delete_confirm = window.confirm("確定要刪除這則推文嗎?");
    if (delete_confirm) {
      try {
        const result = await delAdminTweetAPI(id);
        if (result.status === "success") {
          setNotiMessage({ type: "success", message: "已刪除推文！" });
          setIsAlert(true);
          // 遠端已刪除，但不重新get遠端資料
          setTweetsData((prevTweetsData) =>
            prevTweetsData.filter((tweet) => tweet.id !== id)
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <h4 className="page-title">推文清單</h4>
      {loading ? (
        <LoadingMes />
      ) : (
        <AdminTweetsList tweetsData={tweetsData} onDelete={handleDelete} />
      )}
    </div>
  );
}
export default AdminTweetsPage;
