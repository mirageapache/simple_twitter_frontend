import { NavLink } from "react-router-dom";

import { useRecommend } from "context/RecommendContext";

// style
import "styles/recommend.css";
import "styles/follow_btn.css";
import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";

export default function Recommend() {
  const { recommendData, handleFollowShip } = useRecommend();

  return (
    <div className="recommend">
      <h4 className="title">推薦跟隨</h4>
      <div className="item-group">
        {/* 清單 */}
        <RecommendList
          recommendData={recommendData}
          handleFollowShip={handleFollowShip}
        />
      </div>
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
          <NavLink to={`/main/profile/${data?.id}`}>
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
