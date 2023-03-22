function FollowItem(data) {
  let followData = data.data;
  return followData.map((item) => (
    <div className="follow-item" key={item.id}>
      <img src={item.avatar} alt="user avatar" className="avatar" />
      <div className="follow-container">
        <div className="follow-info">
          <p className="tweet-name">{item.name}</p>
          <button type="button" className="follow-button">
            {item.is_followed ? "正在跟隨" : "跟隨"}
          </button>
        </div>
        <div className="tweet-content">
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
