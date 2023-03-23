function FollowItem(data) {
  let followData = data.data;
  return followData.map((item) => (
    <div className="follow-item" key={item.id}>
      <img src={item.avatar} alt="user avatar" className="follow-item-avatar" />
      <div className="follow-item-container">
        <div className="follow-item-user">
          <p className="follow-tweet-name">{item.name}</p>
          <button type="button" className="follow-item-button">
            {item.is_followed ? "正在跟隨" : "跟隨"}
          </button>
        </div>
        <div className="follow-item-tweet">
          <p>{item.latestTweet}</p>
        </div>
      </div>
    </div>
  ));
}

function followList(data) {
  return (
    <div className="follow-list">
      <FollowItem data={data.data}></FollowItem>
    </div>
  );
}

export default followList;
