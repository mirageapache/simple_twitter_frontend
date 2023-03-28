function FollowItem({ follow, followMode }) {
  let otherUserInfo =
    followMode === "followers" ? follow["Followers"] : follow["Followings"];

  return (
    <div className="follow-item">
      <img
        src={otherUserInfo.avatar}
        alt="user avatar"
        className="follow-item-avatar"
      />
      <div className="follow-item-container">
        <div className="follow-item-user">
          <p className="follow-tweet-name">{otherUserInfo.name}</p>
          <button type="button" className="follow-item-button">
            {otherUserInfo.is_followed ? "正在跟隨" : "跟隨"}
          </button>
        </div>
        <div className="follow-item-tweet">
          <p>{otherUserInfo.introduction}</p>
        </div>
      </div>
    </div>
  );
}

function followList({ followData, followMode }) {
  return (
    <div className="follow-list">
      {followData.map((follow) => {
        return (
          <FollowItem
            key={
              followMode === "followers"
                ? follow.followerId
                : follow.followingId
            }
            follow={follow}
            followMode={followMode}
          />
        );
      })}
    </div>
  );
}

export default followList;
