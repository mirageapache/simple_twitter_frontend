import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useTweet } from "context/TweetContext";

// api
import { getUserDataAPI } from "api/userProfile";
import {
  getUserTweetListAPI,
  getUserReplyListAPI,
  getUserLikeListAPI,
} from "api/main";

// style
import "styles/profile.css";

// components
import ProfileGuide from "components/Profile/ProfileGuide";
import Interactive from "components/Profile/Interactive";
import TweetNavbar from "components/Profile/TweetNavbar";
import TweetList from "components/Main/TweetList.jsx";
import ReplyList from "components/Main/ReplyList";
import ProfileModal from "components/Profile/ProfileModal.jsx";

import { useReply } from "context/ReplyContext";

import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";
import default_cover from "assets/images/default_user_cover.jpg";

const navbarData = [
  { title: "推文", view: "tweet" },
  { title: "回覆", view: "reply" },
  { title: "喜歡", view: "like" },
];

// function
function ProfilePage() {
  const { isAuthenticated, logout, currentMember } = useAuth();
  const { user_id } = useParams();
  const apiId = Number(user_id);
  const selfId = Number(currentMember.id);
  const [modal_toggle, setModalToggle] = useState(false);
  const [reRender, setReRender] = useState(true);
  const { tweetList, setTweetList } = useTweet();
  const { replyList, setReplyList } = useReply();
  const [profileData, setProfileData] = useState({});
  const [currentView, setCurrentView] = useState("tweet");

  //判斷顯示
  const identity = selfId === apiId ? "self" : "other";

  // 取得使用者資訊(還要再改)
  useEffect(() => {
    if (!isAuthenticated) {
      return logout();
    } else {
      const getProfileData = async () => {
        try {
          const result = await getUserDataAPI(apiId);
          if (result.status === 200) {
            const rawProfileData = result.data;
            setProfileData(rawProfileData);
          }
        } catch (err) {
          console.log(err);
        }
      };
      if (reRender) {
        getProfileData();
        setReRender(false);
      }
    }
  }, [isAuthenticated, logout, apiId, reRender]);

  //判斷分頁
  let partialView;
  if (currentView === "tweet") {
    // 推文分頁
    partialView = <TweetList list_data={tweetList} />;
  } else if (currentView === "reply") {
    // 回覆分頁
    partialView = <ReplyList list_data={replyList} />;
  } else {
    //喜歡分頁
    partialView = <TweetList list_data={tweetList} />;
  }

  async function getUserTweetList() {
    const result = await getUserTweetListAPI(apiId);
    if (result.status === 200) {
      setTweetList(result.data);
    }
  }

  // 取得使用者推文
  useEffect(() => {
    if (reRender) {
      getUserTweetList();
      setReRender(false);
      setCurrentView("tweet");
    }
  }, [apiId, reRender]);

  // 更換分頁
  function onViewChange(view) {
    // 取得個人回覆 function
    async function getUserReplyList() {
      const result = await getUserReplyListAPI(apiId);
      if (result.status === 200) {
        setReplyList(result.data);
      }
    }

    //取得喜歡的推文 function
    async function getUserLikeList() {
      const result = await getUserLikeListAPI(apiId);
      if (result.status === 200) {
        const new_data = result.data.map((item) => {
          return item.Tweet;
        });
        setTweetList(new_data);
      }
    }

    if (view === "reply") {
      getUserReplyList(); // 取得個人回覆
    } else if (view === "like") {
      getUserLikeList(); // 取得喜歡的推文
    } else {
      getUserTweetList(); // 取得個人推文
    }
    setCurrentView(view);
  }

  function onModalToggle(is_active, rerender) {
    setModalToggle(is_active);
    rerender && setReRender(rerender);
  }

  return (
    <>
      <ProfileGuide data={profileData} />
      <div className="user-board">
        <div className="cover-wrapper">
          {profileData?.cover ? (
            <img
              src={profileData?.cover}
              alt="user cover"
              className="user-cover"
            />
          ) : (
            <img src={default_cover} alt="user cover" className="user-cover" />
          )}

          <div className="avatar-wrapper">
            {profileData?.avatar ? (
              <img
                src={profileData?.avatar}
                alt="user avatar"
                className="avatar-img"
              />
            ) : (
              <IconAvatar className="avatar_img" />
            )}
          </div>
        </div>
        <div className="info-card">
          <div className="setting-bar">
            {identity === "self" ? (
              <button
                type="button"
                className="btn-base"
                onClick={() => {
                  onModalToggle(true, false);
                }}
              >
                編輯個人資料
              </button>
            ) : (
              <Interactive id={apiId} state={profileData?.is_followed} />
            )}
          </div>
          <div className="card-container">
            <div className="user-info">
              <h5 className="user-name">{profileData?.name}</h5>
              <p className="user-account">@{profileData.account}</p>
              <p className="user-introduction">{profileData.introduction}</p>
              <div className="follow-info">
                <NavLink
                  className="follow-info-item"
                  to={{
                    pathname: `/main/follow/${apiId}/followings`,
                  }}
                  state={{
                    user: {
                      name: `${profileData.name}`,
                      tweet_count: `${profileData?.tweet_count}`,
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
                    pathname: `/main/follow/${apiId}/followers`,
                  }}
                  state={{
                    user: {
                      name: `${profileData?.name}`,
                      tweet_count: `${profileData?.tweet_count}`,
                    },
                  }}
                >
                  <span className="follow-num">
                    {profileData?.follower_count}個
                  </span>
                  <span className="follow-text">跟隨者</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <TweetNavbar
          navbarData={navbarData}
          currentView={currentView}
          onViewChange={onViewChange}
        />

        {/* 分頁 */}
        {partialView}
      </div>

      {modal_toggle && <ProfileModal onModalToggle={onModalToggle} />}
    </>
  );
}
export default ProfilePage;
