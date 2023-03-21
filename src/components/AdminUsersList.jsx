import { ReactComponent as IconLikeLight } from "assets/icons/like_light.svg";
import { ReactComponent as IconPost } from "assets/icons/post.svg";

function UserCard(users) {
  return users.map((user) => (
    <div className="user-card" key={user.id}>
      <img src={user.cover_img} className="card-cover" alt="user cover" />
      <img src={user.avatar} className="user-avatar" alt="user avatar" />
      <div className="card-body">
        <p className="user-name">{user.name}</p>
        <p className="user-account">@{user.account}</p>
        <div className="tweet-info">
          <div>
            <IconPost className="tweet-info-svg" />
            <span className="tweet-text">
              {user.tweet_count >= 1000
                ? Math.round(user.tweet_count / 100) / 10 + "K"
                : user.tweet_count}
            </span>
          </div>
          <div>
            <IconLikeLight className="tweet-info-svg" />
            <span>
              {user.total_like >= 1000
                ? Math.round(user.total_like / 100) / 10 + "K"
                : user.total_like}
            </span>
          </div>
        </div>
        <div className="follow-info">
          <span className="follow-item">
            <span className="follow-num">{user.following_count}個</span>
            <span className="follow-text">跟隨中</span>
          </span>
          <span className="follow-item">
            <span className="follow-num"> {user.follower_count}位</span>
            <span className="follow-text">跟隨者</span>
          </span>
        </div>
      </div>
    </div>
  ));
}

function AdminUsersList(data) {
  return <div className="user-list">{UserCard(data.usersData)}</div>;
}

export default AdminUsersList;
