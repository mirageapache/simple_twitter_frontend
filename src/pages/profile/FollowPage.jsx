import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useRecommend } from "context/RecommendContext";
import { useNoti } from "context/NotiContext";
import { useFollow } from "context/FollowContext";

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
import LoadingMes from "components/LoadingMes";

// data
const navbarData = [
  { title: "追隨者", view: "followers" },
  { title: "正在追隨", view: "followings" },
];

// function
function FollowPage() {
  const { isAuthenticated, logout, currentMember } = useAuth();
  const { renewRecommendList } = useRecommend();
  const { toggleFollowed } = useFollow();
  const { setIsAlert, setNotiMessage } = useNoti();
  const { user_id } = useParams();
  const apiId = Number(user_id); //正在瀏覽誰
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
  const [loading, setLoading] = useState(true);
  const [reNew, setRenew] = useState(false);

  // 取得資料
  useEffect(() => {
    if (!isAuthenticated) {
      return logout();
    } else {
      const getFollowData = async (apiId) => {
        try {
          setLoading(true);
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
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      getFollowData(apiId);
    }
  }, [isAuthenticated, logout, apiId, followMode, reNew, toggleFollowed]);

  // 更換分頁
  function onViewChange(modeState) {
    async function getFollowData(followMode) {
      try {
        setLoading(true);
        setFollowMode(modeState);
        setRenew(!reNew);
      } catch (err) {
        console.log(err);
      }
    }
    getFollowData(modeState);
  }

  //切換跟隨
  function handleFollowShip(followShipId, followedState) {
    async function toggleFollowShip(followShipId, followedState) {
      try {
        const result = followedState
          ? await unFollowAPI(followShipId)
          : await createFollowShipAPI(followShipId);
        if (result?.status === "success") {
          // 設定通知訊息
          followedState
            ? setNotiMessage({ type: "info", message: "已取消跟隨！" })
            : setNotiMessage({ type: "success", message: "已跟随！" });
          setIsAlert(true);
          renewRecommendList(true);
          setRenew(!reNew);
        }
      } catch (err) {
        console.log(err);
      }
    }
    toggleFollowShip(followShipId, followedState);
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
        <LoadingMes />
      ) : (
        <FollowList
          followData={followData}
          followMode={followMode}
          handleFollowShip={handleFollowShip}
          selfId={selfId}
        />
      )}
    </>
  );
}

export default FollowPage;
