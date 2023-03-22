// components
import ProfileGuide from "components/profile/ProfileGuide";
import FollowList from "components/follow/FollowList";
import FollowNavbar from "components/follow/FollowNavbar";

//style
import "styles/follow.css";

// data
import { userSelfData } from "data/dummyProfileData";
import { followerData } from "data/dummyFollowData";
// import { followingData } from "data/dummyFollowData";

// function
function FollowPage() {
  return (
    <>
      <ProfileGuide data={userSelfData} />
      {/* 選項 */}
      <FollowNavbar />
      {/* 清單共用元件：follow */}
      <FollowList data={followerData} />
      {/* 清單共用元件：following */}
      {/* <FollowList data={followingData} /> */}
    </>
  );
}

export default FollowPage;
