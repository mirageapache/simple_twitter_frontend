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
const navbarData = ["追隨者", "正在追隨"];

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
        let rawfollowData =
          followMode === "followers"
            ? await getFollowersDataAPI(apiId)
            : await getFollowingsDataAPI(apiId);
        console.log("rawfollowData", rawfollowData);
        setFollowData(rawfollowData);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowData(apiId);
  }, []);

  return (
    <>
      <ProfileGuide data={user} />
      {/* 選項 */}
      <div className="border-top-line">
        <TweetNavbar navbarData={navbarData} />
      </div>
      {/* 清單 */}
      <FollowList followData={followData} followMode={followMode} />
    </>
  );
}

export default FollowPage;
