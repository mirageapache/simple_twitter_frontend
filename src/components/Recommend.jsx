import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { useNoti } from "context/NotiContext";
// api
import {
  getRecommendAPI,
  createFollowShipAPI,
  unFollowAPI,
} from "api/userfollow";

// style
import "styles/recommend.css";
import "styles/follow_btn.css";
import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";

export default function Recommend() {
  const [recommendData, setRecommendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setIsAlert, setNotiMessage } = useNoti();
  const [reNew, setRenew] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  // 取得推薦
  useEffect(() => {
    if (!isAuthenticated) {
      return logout();
    } else {
      const getRecommend = async () => {
        try {
          let rawRecommendData = await getRecommendAPI();
          setRecommendData(rawRecommendData);
          setLoading(true);
        } catch (err) {
          console.log(err);
        }
      };
      getRecommend();
    }
  }, [reNew, isAuthenticated, logout]);

  // 跟隨、取消
  function handleFollowShip(followShipId, followedState) {
    async function toggleFollowShip(followShipId, followedState) {
      try {
        const result = followedState
          ? await unFollowAPI(followShipId)
          : await createFollowShipAPI(followShipId);
        if (result.status === "success") {
          // 需要重新取得遠端資料：為了排序
          setLoading(false);
          // 設定通知訊息
          followedState
            ? setNotiMessage({ type: "info", message: "已取消跟隨！" })
            : setNotiMessage({ type: "success", message: "已跟随！" });
          setIsAlert(true);
          setRenew(!reNew);
        }
      } catch (err) {
        console.log(err);
      }
    }
    toggleFollowShip(followShipId, followedState);
  }

  return (
    <div className="recommend">
      <h4 className="title">推薦跟隨</h4>
      {/* 清單，等取得資料才render */}
      {loading ? (
        <RecommendList
          recommendData={recommendData}
          handleFollowShip={handleFollowShip}
        />
      ) : (
        ""
      )}
    </div>
  );
}

function RecommendList({ recommendData, handleFollowShip }) {
  return recommendData.map((data) => {
    if (data?.is_followed) {
      return (
        <RecommendItem
          key={data?.id}
          btnClass="followStatus_button_active"
          data={data}
          handleFollowShip={handleFollowShip}
        />
      );
    } else {
      return (
        <RecommendItem
          key={data?.id}
          btnClass="followStatus_button"
          data={data}
          handleFollowShip={handleFollowShip}
        />
      );
    }
  });
}

function RecommendItem({ data, btnClass, handleFollowShip }) {
  return (
    <div className="recommend_item">
      <div className="recommend_item_info">
        {data?.avatar ? (
          <NavLink to={`/profile/${data?.id}`}>
            <img
              src={data?.avatar}
              alt="user avatar"
              className="recommend_item_avatar"
            />
          </NavLink>
        ) : (
          <IconAvatar />
        )}

        <div className="item_text">
          <p className="name">{data?.name}</p>
          <p className="account">@{data?.account}</p>
        </div>
      </div>
      <button
        type="button"
        className={btnClass}
        onClick={() => {
          handleFollowShip(data.id, data?.is_followed);
        }}
      >
        {data.is_followed ? "正在跟隨" : "跟隨"}
      </button>
    </div>
  );
}
