import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";

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
  const { currentMember } = useAuth();
  const { user_id } = useParams();
  const [identity, setIdentity] = useState(null);
  const apiId = Number(user_id);
  const selfId = Number(currentMember?.id);
  // 取表頭資料
  const { pathname, state } = useLocation();
  const user = state.user;
  // 判斷來源初始模式
  let originMode;
  if (pathname.includes("followers")) {
    originMode = "followers";
  } else if (pathname.includes("followings")) {
    originMode = "followings";
  }
  const [followMode, setFollowMode] = useState(originMode);
  const [followData, setFollowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reNew, setRenew] = useState(false);
  // 取得資料
  useEffect(() => {
    const getFollowData = async (apiId) => {
      try {
        setLoading(false);
        let rawFollowData =
          followMode === "followers"
            ? await getFollowersDataAPI(apiId)
            : await getFollowingsDataAPI(apiId);
        let dataSetState =
          followMode === "followers"
            ? rawFollowData.map((item) => ({
                ...item,
                checkFollowed: item?.Followers?.is_followed,
              }))
            : rawFollowData.map((item) => ({
                ...item,
                checkFollowed: item?.Followings?.is_followed,
              }));
        setFollowData(dataSetState);
        setLoading(true);
        //判斷顯示
        selfId === apiId ? setIdentity("self") : setIdentity("other");
      } catch (err) {
        console.log(err);
      }
    };
    getFollowData(apiId);
  }, [apiId, followMode, reNew, identity, selfId]);

  // 更換分頁
  function onViewChange(modeState) {
    async function getFollowData(followMode) {
      try {
        setLoading(false);
        setFollowMode(modeState);
        setRenew(!reNew);
      } catch (err) {
        console.log(err);
      }
    }
    getFollowData(modeState);
  }

  //切換跟隨
  function handleFollowShip(followShipId, followedState, IdType) {
    async function toggleFollowShip(followShipId, followedState, IdType) {
      try {
        if (!followedState) {
          const result = await createFollowShipAPI(followShipId);
          if (result.status === "success" && IdType === "followerId") {
            // 重新取得遠端資料
            setRenew(!reNew);
          }
        } else {
          const result = await unFollowAPI(followShipId);
          if (result.status === "success") {
            // 重新取得遠端資料
            setRenew(!reNew);
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
      {/* 清單，等取得資料才render */}
      {loading ? (
        <FollowList
          followData={followData}
          followMode={followMode}
          handleFollowShip={handleFollowShip}
          identity={identity}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default FollowPage;
