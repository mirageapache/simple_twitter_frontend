import { useState, useEffect } from "react";

// style
import "styles/AdminTweets.css";
// components
import AdminTweetsList from "components/Admin/AdminTweetsList";
// api
import { getAdminTweetsAPI, delAdminTweetAPI } from "api/adminApi";

function AdminTweetsPage() {
  const [tweetsData, setTweetsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTweetsData = async () => {
      try {
        const rawTweetsData = await getAdminTweetsAPI();
        setTweetsData(rawTweetsData);
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getTweetsData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await delAdminTweetAPI(id);
      if (result.status === "success") {
        // 遠端已刪除，但不重新get遠端資料
        setTweetsData((prevTweetsData) =>
          prevTweetsData.filter((tweet) => tweet.id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page-wrapper">
      <h4 className="page-title">推文清單</h4>
      {loading ? (
        <AdminTweetsList tweetsData={tweetsData} onDelete={handleDelete} />
      ) : (
        ""
      )}
    </div>
  );
}
export default AdminTweetsPage;
