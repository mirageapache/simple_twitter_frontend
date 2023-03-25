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
  let rowRelativeTime = moment(tweet.updatedAt).endOf("day").fromNow().trim();
  let hourIndex = rowRelativeTime.indexOf("h");
  let relativeTime =
    rowRelativeTime.slice(0, hourIndex) <= 24
      ? rowRelativeTime
      : moment(tweet.updatedAt).format("LLL");
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
          <p>
            {tweet.description.length >= 50
              ? tweet.description + "..."
              : tweet.description}
          </p>
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
