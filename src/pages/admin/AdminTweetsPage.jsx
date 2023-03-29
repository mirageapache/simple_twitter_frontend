import { useState, useEffect } from "react";
import { useNoti } from "context/NotiContext";
// style
import "styles/AdminTweets.css";
// components
import AdminTweetsList from "components/Admin/AdminTweetsList";
// api
import { getAdminTweetsAPI, delAdminTweetAPI } from "api/adminApi";

function AdminTweetsPage() {
  const [tweetsData, setTweetsData] = useState([]);
  const { setIsAlert, setNotiMessage } = useNoti();

  useEffect(() => {
    const getTweetsData = async () => {
      try {
        const rawTweetsData = await getAdminTweetsAPI();
        setTweetsData(rawTweetsData);
      } catch (err) {
        console.log(err);
      }
    };
    getTweetsData();
  }, []);

  const handleDelete = async (id) => {
    let delete_confirm = window.confirm('確定要刪除這則推文嗎?');
    if(delete_confirm){
      try {
        const result = await delAdminTweetAPI(id);
        if (result.status === "success") {
          setTweetsData((prevTweetsData) =>
            prevTweetsData.filter((tweet) => tweet.id !== id)
          );
          setNotiMessage({type:"success", message:"已刪除推文！"});
          setIsAlert(true); 
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="page-wrapper">
      <h4 className="page-title">推文清單</h4>
      <AdminTweetsList tweetsData={tweetsData} onDelete={handleDelete} />
    </div>
  );
}
export default AdminTweetsPage;
