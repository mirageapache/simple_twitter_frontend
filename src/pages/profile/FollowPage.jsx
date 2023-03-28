import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getFollowersDataAPI, getFollowingsDataAPI } from "api/userfollow";

//style
import "styles/follow.css";
// components
import ProfileGuide from "components/Profile/ProfileGuide.jsx";
import FollowList from "components/Profile/FollowList";
import TweetNavbar from "components/Profile/TweetNavbar";

// data
const navbarData = [
  { title: "追隨者", view: "followers" },
  { title: "正在追隨", view: "followings" },
];

// function
function FollowPage() {
  const { user_id } = useParams();
  const apiId = Number(user_id);

  const { pathname, state } = useLocation();
  const user = state.user;
  let originMode;
  if (pathname.includes("followers")) {
    originMode = "followers";
  } else if (pathname.includes("followings")) {
    originMode = "followings";
  }
  const [followMode, setFollowMode] = useState(originMode);
  const [followData, setFollowData] = useState([]);

  useEffect(() => {
    const getFollowData = async (apiId) => {
      try {
        let rawFollowData =
          followMode === "followers"
            ? await getFollowersDataAPI(apiId)
            : await getFollowingsDataAPI(apiId);
        setFollowData(rawFollowData);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowData(apiId);
  }, []);

  // 更換分頁
  function onViewChange(followMode) {
    async function getFollowData() {
      try {
        let rawFollowData =
          followMode === "followers"
            ? await getFollowersDataAPI(apiId)
            : await getFollowingsDataAPI(apiId);
        setFollowData(rawFollowData);
        setFollowMode(followMode);
      } catch (err) {
        console.log(err);
      }
    }
    getFollowData();
  }

  return (
    <>
      <ProfileGuide data={user} />
      {/* 選項 */}
      <div className="border-top-line">
        <TweetNavbar
          navbarData={navbarData}
          currentView={followMode}
          onViewChange={onViewChange}
        />
      </div>
      {/* 清單 */}
      <FollowList followData={followData} followMode={followMode} />
    </>
  );
}

export default FollowPage;
