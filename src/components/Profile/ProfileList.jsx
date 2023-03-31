import { useState, useEffect } from "react";
import { useTweet } from "context/TweetContext";
import { useReply } from "context/ReplyContext";

// api
import {
  getUserTweetListAPI,
  getUserReplyListAPI,
  getUserLikeListAPI,
} from "api/main";

// style
import "styles/profile.css";

// components

import TweetNavbar from "components/Profile/TweetNavbar";
import TweetList from "components/Main/TweetList.jsx";
import ReplyList from "components/Main/ReplyList";
import LoadingMes from "components/LoadingMes";

// import { useReply } from "context/ReplyContext";

const navbarData = [
  { title: "推文", view: "tweet" },
  { title: "回覆", view: "reply" },
  { title: "喜歡", view: "like" },
];

// function
function ProfileList({ apiId }) {
  // console.log("apiId", apiId);
  let dataId = apiId;
  const [currentView, setCurrentView] = useState("tweet");
  const { tweetList, setTweetList } = useTweet();
  const { replyList, setReplyList } = useReply();

  const [loading, setLoading] = useState(true);

  let partialView;
  if (currentView === "tweet") {
    // 推文分頁
    partialView = <TweetList list_data={tweetList} />;
  } else if (currentView === "reply") {
    // 回覆分頁
    partialView = <ReplyList list_data={replyList} />;
  } else if (currentView === "like") {
    //喜歡分頁
    partialView = <TweetList list_data={tweetList} />;
  }

  // 取得使用者推文
  useEffect(() => {
    const getListData = async (dataId) => {
      try {
        setLoading(true);
        if (currentView === "tweet") {
          const result = await getUserTweetListAPI(dataId); // 取得推文
          if (result?.status === 200) {
            setTweetList(result?.data);
            setLoading(false);
            return;
          }
        } else if (currentView === "reply") {
          const result = await getUserReplyListAPI(dataId); // 取得回覆
          if (result?.status === 200) {
            setReplyList(result?.data);
            setLoading(false);
            return;
          }
        } else if (currentView === "like") {
          const result = await getUserLikeListAPI(dataId); // 取得喜歡
          if (result?.status === 200) {
            const new_data = result?.data.map((item) => {
              return item?.Tweet;
            });
            setTweetList(new_data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getListData(dataId);
  }, [dataId, currentView]);

  // 更換分頁
  function onViewChange(view) {
    setCurrentView(view);
    async function getListData(followMode) {
      try {
        setLoading(true);
        setCurrentView(view);
      } catch (err) {
        console.log(err);
      }
    }
    getListData(view);
  }

  return (
    <>
      <TweetNavbar
        navbarData={navbarData}
        currentView={currentView}
        onViewChange={onViewChange}
      />

      {/* 分頁 */}
      {loading ? <LoadingMes /> : partialView}
    </>
  );
}
export default ProfileList;
