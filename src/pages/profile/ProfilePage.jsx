import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "context/AuthContext";
// import { useNavigate } from "react-router-dom";

// api
import { getUserDataAPI } from "api/userProfile";

// style
import "styles/profile.css";

// components
import ProfileGuide from "components/Profile/ProfileGuide";
import Interactive from "components/Profile/Interactive";
import TweetNavbar from "components/Profile/TweetNavbar";
// import TweetList from "components/Main/TweetList.jsx";
// import ReplyList from "components/Main/ReplyList";
import ProfileModal from "components/Profile/ProfileModal.jsx";

const navbarData = ["推文", "回覆", "喜歡"];

// function
function ProfilePage() {
  const { currentMember } = useAuth();
  const { user_id } = useParams();
  const apiId = Number(user_id);
  const selfId = Number(currentMember.id);

  //判斷顯示
  const identity = selfId === apiId ? "self" : "other";

  // 取資料
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const getProfileData = async () => {
      try {
        let rawProfileData = await getUserDataAPI(apiId);
        setProfileData(rawProfileData);
      } catch (err) {
        console.log(err);
      }
    };
    getProfileData();
  }, [apiId]);

  // Modal toggle
  const [modal_toggle, setModalToggle] = useState(false);
  function onModalToggle() {
    setModalToggle(!modal_toggle);
  }
  return (
    <>
      <ProfileGuide data={profileData} />
      <div className="user-board">
        <div className="cover-wrapper">
          <img
            src={profileData.cover}
            alt="user cover"
            className="user-cover"
          />
          <div className="avatar-wrapper">
            <img
              src={profileData.avatar}
              alt="user avatar"
              className="avatar-img"
            />
          </div>
        </div>
        <div className="info-card">
          <div className="setting-bar">
            {identity === "self" ? (
              <button
                type="button"
                className="btn-base"
                onClick={onModalToggle}
              >
                編輯個人資料
              </button>
            ) : (
              <Interactive />
            )}
          </div>
          <div className="card-container">
            <div className="user-info">
              <h5 className="user-name">{profileData.name}</h5>
              <p className="user-account">@{profileData.account}</p>
              <p className="user-introduction">{profileData.introduction}</p>
              <div className="follow-info">
                <NavLink
                  className="follow-info-item"
                  to={{
                    pathname: `/follow/${apiId}/followers`,
                  }}
                  state={{
                    user: {
                      name: `${profileData.name}`,
                      tweet_count: `${profileData.tweet_count}`,
                    },
                  }}
                >
                  <span className="follow-num">
                    {profileData.following_count}個
                  </span>
                  <span className="follow-text">跟隨中</span>
                </NavLink>
                <NavLink
                  className="follow-info-item"
                  to={{
                    pathname: `/follow/${apiId}/followings`,
                  }}
                  state={{
                    user: {
                      name: `${profileData.name}`,
                      tweet_count: `${profileData.tweet_count}`,
                    },
                  }}
                >
                  <span className="follow-num">
                    {profileData.follower_count}個
                  </span>
                  <span className="follow-text">跟隨者</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <TweetNavbar navbarData={navbarData} />
        {/* <TweetList /> */}
        {/* <ReplyList /> */}
        {/* like list 跟 tweetList共用版型 */}
      </div>

      {modal_toggle && <ProfileModal onModalToggle={onModalToggle} />}
    </>
  );
}
export default ProfilePage;
