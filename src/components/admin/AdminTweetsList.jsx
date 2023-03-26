import { ReactComponent as IconDelete } from "assets/icons/delete.svg";

function TweetItem(data) {
  return data.map((item) => (
    <div className="tweet-item" key={item.id}>
      <img src={item.avatar} alt="user avatar" className="avatar" />
      <div className="item-container">
        <div className="item-info">
          <span className="tweet-name">{item.name}</span>
          <span className="tweet-active-info">
            <span>@{item.account}</span>
            <span>・{item.create_at}</span>
          </span>
        </div>
        <div className="tweet-content">
          <p>(tweet時間等串api再調整){item.content}</p>
        </div>
      </div>
      <IconDelete className="del-icon-svg" />
    </div>
  ));
}

function AdminTweetsList(data) {
  return <div className="tweets-list">{TweetItem(data.tweetsData)}</div>;
}

export default AdminTweetsList;
