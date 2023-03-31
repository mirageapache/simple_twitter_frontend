import { NavLink } from "react-router-dom";
function FollowItem({
  follow,
  followMode,
  btnClass,
  handleFollowShip,
  selfId,
}) {
  let otherUserInfo;
  let followShipId;
  let IdType;
  if (followMode === "followers") {
    otherUserInfo = follow["Followers"];
    followShipId = follow?.followerId;
    IdType = "followerId";
  } else if (followMode === "followings") {
    otherUserInfo = follow["Followings"];
    followShipId = follow?.followingId;
    IdType = "followingId";
  }
  return (
    <div className="follow-item">
      <NavLink to={`/main/profile/${followShipId}`}>
        <img
          src={otherUserInfo?.avatar}
          alt="user avatar"
          className="follow-item-avatar"
        />
      </NavLink>
      <div className="follow-item-container">
        <div className="follow-item-user">
          <p className="follow-tweet-name">{otherUserInfo?.name}</p>
          {selfId === followShipId ? (
            ""
          ) : (
            <button
              type="button"
              className={btnClass}
              onClick={() => {
                handleFollowShip(followShipId, follow?.checkFollowed, IdType);
              }}
            >
              {follow.checkFollowed ? "正在跟隨" : "跟隨"}
            </button>
          )}
        </div>
        <div className="follow-item-tweet">
          <p>{otherUserInfo?.introduction}</p>
        </div>
      </div>
    </div>
  );
}

function followList({ followData, followMode, handleFollowShip, selfId }) {
  return (
    <div className="follow-list">
      {followData.map((follow) => {
        if (follow?.checkFollowed) {
          return (
            <FollowItem
              key={
                followMode === "followers"
                  ? follow?.followerId
                  : follow?.followingId
              }
              btnClass="followStatus_button_active"
              follow={follow}
              followMode={followMode}
              handleFollowShip={handleFollowShip}
              selfId={selfId}
            />
          );
        } else {
          return (
            <FollowItem
              key={
                followMode === "followers"
                  ? follow?.followerId
                  : follow?.followingId
              }
              btnClass="followStatus_button"
              follow={follow}
              followMode={followMode}
              handleFollowShip={handleFollowShip}
              selfId={selfId}
            />
          );
        }
      })}
    </div>
  );
}

export default followList;
