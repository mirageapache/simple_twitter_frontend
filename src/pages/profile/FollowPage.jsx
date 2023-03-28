import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import {
  getFollowersDataAPI,
  getFollowingsDataAPI,
  unFollowAPI,
  createFollowShipAPI,
} from "api/userfollow";

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
        let rawFollowData;
        let dataSetState;
        if (followMode === "followers") {
          rawFollowData = await getFollowersDataAPI(apiId);
          dataSetState = rawFollowData.map((item) => ({
            ...item,
            checkFollowed: item?.Followers?.is_followed,
          }));
        } else if (followMode === "followings") {
          rawFollowData = await getFollowingsDataAPI(apiId);
          dataSetState = rawFollowData.map((item) => ({
            ...item,
            checkFollowed: item?.Followings?.is_followed,
          }));
        }
        setFollowData(dataSetState);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowData(apiId);
  }, []);

  // 更換分頁
  function onViewChange(followMode) {
    async function getFollowData(followMode) {
      try {
        let rawFollowData;
        let dataSetState;
        if (followMode === "followers") {
          rawFollowData = await getFollowersDataAPI(apiId);
          dataSetState = rawFollowData.map((item) => ({
            ...item,
            checkFollowed: item?.Followers?.is_followed,
          }));
        } else if (followMode === "followings") {
          rawFollowData = await getFollowingsDataAPI(apiId);
          dataSetState = rawFollowData.map((item) => ({
            ...item,
            checkFollowed: item?.Followings?.is_followed,
          }));
        }
        setFollowData(dataSetState);
        setFollowMode(followMode);
      } catch (err) {
        console.log(err);
      }
    }
    getFollowData(followMode);
  }

  //切換跟隨
  function handleFollowShip(followShipId, followedState, IdType) {
    async function toggleFollowShip(followShipId, followedState, IdType) {
      try {
        if (!followedState) {
          const result = await createFollowShipAPI(followShipId);
          if (result.status === "success" && IdType === "followerId") {
            setFollowData((prevFollow) => {
              return prevFollow.map((follow) => {
                if (follow.followerId === followShipId) {
                  return {
                    ...follow,
                    checkFollowed: !followedState,
                  };
                }
                return follow;
              });
            });
          }
        } else {
          const result = await unFollowAPI(followShipId);
          if (result.status === "success") {
            if (IdType === "followingId") {
              setFollowData((prevFollow) =>
                prevFollow.filter(
                  (follow) => follow?.followingId !== followShipId
                )
              );
            } else if (IdType === "followerId") {
              setFollowData((prevFollow) => {
                return prevFollow.map((follow) => {
                  if (follow.followerId === followShipId) {
                    return {
                      ...follow,
                      checkFollowed: !followedState,
                    };
                  }
                  return follow;
                });
              });
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    toggleFollowShip(followShipId, followedState, IdType);
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
      <FollowList
        followData={followData}
        followMode={followMode}
        handleFollowShip={handleFollowShip}
      />
    </>
  );
}

export default FollowPage;
