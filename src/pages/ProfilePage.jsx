// style
import "styles/profile.css";

// methods
import { useState } from "react";

// components
import ProfileGuide from "components/Profile/ProfileGuide";
// import Interactive from "components/profile/Interactive";
import TweetNavbar from "components/Profile/TweetNavbar";
import TweetList from "components/Main/TweetList.jsx";
// import ReplyList from "components/Main/ReplyList";
import ProfileModal from "components/Profile/ProfileModal.jsx";

// data
import { userSelfData } from "data/dummyProfileData";
const navbarData = ["推文", "回覆", "喜歡"];

// function
function ProfilePage() {
  let data = userSelfData;
  // Modal toggle
  const [modal_toggle, setModalToggle] = useState(false);

  // Modal toggle Function
  function onModalToggle() {
    setModalToggle(!modal_toggle);
  }
  return (
    <>
      <ProfileGuide data={userSelfData} />
      <div className="user-board">
        <div className="cover-wrapper">
          <img src={data.cover_img} alt="user cover" className="user-cover" />
          <div className="avatar-wrapper">
            <img src={data.avatar} alt="user avatar" className="avatar-img" />
          </div>
        </div>
        <div className="info-card">
          <div className="setting-bar">
            {/* <Interactive /> */}
            <button type="button" className="btn-base" onClick={onModalToggle}>
              編輯個人資料
            </button>
          </div>
          <div className="card-container">
            <div className="user-info">
              <h5 className="user-name">{data.name}</h5>
              <p className="user-account">@{data.account}</p>
              <p className="user-introduction">{data.introduction}</p>
              <div className="follow-info">
                <span className="follow-info-item">
                  <span className="follow-num">{data.following_count}個</span>
                  <span className="follow-text">跟隨中</span>
                </span>
                <span className="follow-info-item">
                  <span className="follow-num">{data.follower_count}個</span>
                  <span className="follow-text">跟隨者</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <TweetNavbar navbarData={navbarData} />
        <TweetList />
        {/* <ReplyList /> */}
        {/* like list 跟 tweetList共用版型 */}
      </div>
      {modal_toggle && <ProfileModal onModalToggle={onModalToggle} />}
    </>
  );
}
export default ProfilePage;
