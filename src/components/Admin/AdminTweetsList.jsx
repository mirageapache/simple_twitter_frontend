import moment from "moment";

// svg
import { ReactComponent as IconDelete } from "assets/icons/delete.svg";

function AdminTweetsList({ tweetsData, onDelete }) {
  return (
    <div className="tweets-list">
      {tweetsData.map((tweet) => {
        return (
          <TweetItem
            key={tweet.id}
            tweet={tweet}
            onDelete={(id) => onDelete?.(id)}
          />
        );
      })}
    </div>
  );
}

function TweetItem({ tweet, onDelete }) {
  // 時間轉換
  let rowRelativeTime = moment(tweet.updatedAt)
    .startOf("second")
    .fromNow()
    .trim();
  let hourIndex = rowRelativeTime.indexOf("h");
  let minIndex = rowRelativeTime.indexOf("m");
  let secondIndex = rowRelativeTime.indexOf("seconds");
  let relativeTime;
  if (secondIndex > 0) {
    relativeTime = "now";
  } else if (minIndex > 0) {
    if (rowRelativeTime.includes("a minute ago")) {
      relativeTime = "now";
    } else {
      relativeTime = `${rowRelativeTime.slice(0, minIndex)}分鐘`;
    }
  } else if (hourIndex > 0) {
    if (rowRelativeTime.includes("an hour ago")) {
      relativeTime = "1小時";
    } else {
      relativeTime = `${rowRelativeTime.slice(0, hourIndex)}小時`;
    }
  } else {
    relativeTime = moment(tweet.updatedAt).format("LLL");
  }

  return (
    <div className="tweet-item" key={tweet.id}>
      <img src={tweet.User.avatar} alt="user avatar" className="avatar" />
      <div className="item-container">
        <div className="item-info">
          <span className="tweet-name">{tweet.User.name}</span>
          <span className="tweet-active-info">
            <span>@{tweet.User.account}・</span>
            <span>{relativeTime}</span>
          </span>
        </div>
        <div className="tweet-content">
          <p>{tweet.description}</p>
        </div>
      </div>
      <IconDelete
        className="del-icon-svg"
        onClick={() => onDelete?.(tweet.id)}
      />
    </div>
  );
}

export default AdminTweetsList;
