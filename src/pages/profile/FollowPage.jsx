// components
import ProfileGuide from "components/Profile/ProfileGuide.jsx";

import FollowList from "components/Profile/FollowList";
import TweetNavbar from "components/Profile/TweetNavbar";

//style
import "styles/follow.css";

// data
import { userSelfData } from "data/dummyProfileData";
import { followerData } from "data/dummyFollowData";
// import { followingData } from "data/dummyFollowData";
const navbarData = ["追隨者", "正在追隨"];

// function
function FollowPage() {
  return (
    <>
      <ProfileGuide data={userSelfData} />
      {/* 選項 */}
      <div className="border-top-line">
        <TweetNavbar navbarData={navbarData} />
      </div>
      {/* 清單共用元件：follow */}
      <FollowList data={followerData} />
      {/* 清單共用元件：following */}
      {/* <FollowList data={followingData} /> */}
    </>
  );
}

export default FollowPage;
