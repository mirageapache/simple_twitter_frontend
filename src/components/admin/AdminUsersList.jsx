import { ReactComponent as IconLikeLight } from "assets/icons/like_light.svg";
import { ReactComponent as IconPost } from "assets/icons/post.svg";

function UserCard(users) {
  return users.map((user) => (
    <div className="admin-user-card" key={user.id}>
      <img src={user.cover_img} className="admin-card-cover" alt="user cover" />
      <img src={user.avatar} className="admin-card-avatar" alt="user avatar" />
      <div className="card-body">
        <p className="user-card-name">{user.name}</p>
        <p className="user-card-account">@{user.account}</p>
        <div className="user-card-tweet">
          <div>
            <IconPost className="tweet-info-svg" />
            <span className="card-tweet-text">
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
        <div className="user-card-follow">
          <span className="card-follow-item">
            <span className="follow-num">{user.following_count}個</span>
            <span className="follow-text">跟隨中</span>
          </span>
          <span className="card-follow-item">
            <span className="follow-num"> {user.follower_count}位</span>
            <span className="follow-text">跟隨者</span>
          </span>
        </div>
      </div>
    </div>
  ));
}

function AdminUsersList(data) {
  return <div className="admin-user-list">{UserCard(data.usersData)}</div>;
}

export default AdminUsersList;
