import { useState, useEffect } from "react";
import { useLocation, NavLink, useParams } from "react-router-dom";
import { useAuth } from "context/AuthContext";

// api
import { getUserDataAPI } from "api/userProfile";
// style
import "styles/profile.css";

// components
import ProfileGuide from "components/Profile/ProfileGuide";
import Interactive from "components/Profile/Interactive";
import ProfileModal from "components/Profile/ProfileModal.jsx";

import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";
import default_cover from "assets/images/default_user_cover.jpg";

// function
function ProfilePage() {
  const { isAuthenticated, logout, currentMember } = useAuth();
  const { pathname } = useLocation();
  const { user_id } = useParams();
  const apiId = Number(user_id);
  const selfId = Number(currentMember.id);
  const [modal_toggle, setModalToggle] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [profileData, setProfileData] = useState({});

  //判斷顯示
  const identity = selfId === apiId ? "self" : "other";

  // 取得使用者資訊(還要再改)
  useEffect(() => {
    // console.log("identity", identity);
    // console.log("apiId", apiId);
    // console.log("pathname", pathname);
    console.log("identity", identity);
    console.log("apiId", apiId);
    console.log("pathname", pathname);
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
      getProfileData();
    }
  }, [isAuthenticated, logout, pathname, apiId, reRender]);

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
      </div>

      {modal_toggle && (
        <ProfileModal onModalToggle={onModalToggle} reRender={reRender} />
      )}
    </>
  );
}
export default ProfilePage;
