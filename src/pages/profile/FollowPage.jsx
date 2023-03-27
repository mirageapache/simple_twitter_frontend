// import {
//   useState,
//   // useEffect
// } from "react";
import { useParams, useLocation } from "react-router-dom";
// components
import ProfileGuide from "components/Profile/ProfileGuide.jsx";
// import FollowList from "components/Profile/FollowList";
import TweetNavbar from "components/Profile/TweetNavbar";

//style
import "styles/follow.css";

// data
// import { userSelfData } from "data/dummyProfileData";
// import { followerData } from "data/dummyFollowData";
// import { followingData } from "data/dummyFollowData";
const navbarData = ["追隨者", "正在追隨"];

// function
function FollowPage() {
  const { user_id } = useParams();
  const apiId = Number(user_id);
  const { pathname, state } = useLocation();
  const user = state.user;
  console.log("state", user);
  let originMode;
  if (pathname.includes("followers")) {
    originMode = "followers";
  } else if (pathname.includes("followings")) {
    originMode = "followings";
  }
  // const [followMode, setFollowMode] = useState(originMode);
  // const [followData, setFollowData] = useState([]);

  console.log("originMode", originMode);
  console.log("apiId", apiId);

  return (
    <>
      <ProfileGuide data={user} />
      {/* 選項 */}
      <div className="border-top-line">
        <TweetNavbar navbarData={navbarData} />
      </div>
      {/* 清單共用元件：follow */}
      {/* <FollowList data={followerData} /> */}
      {/* 清單共用元件：following */}
      {/* <FollowList data={followingData} /> */}
    </>
  );
}

export default FollowPage;
