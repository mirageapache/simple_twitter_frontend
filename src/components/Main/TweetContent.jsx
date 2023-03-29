import { ReplyList, ReplyModal } from "components";
import { useTweet } from "context/TweetContext";
import { useReply } from "context/ReplyContext";
import ReplyModal from "./ReplyModal";
import { NavLink } from "react-router-dom";
import moment from "moment";
// style
import "styles/tweet_content.css";

// svg
import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";
import { ReactComponent as IconLeftArrow } from "assets/icons/left_arrow.svg";
import { ReactComponent as IconReply } from "assets/icons/reply.svg";
import { ReactComponent as IconLike } from "assets/icons/like.svg";
import { ReactComponent as IconLikeLight } from "assets/icons/like_light.svg";
import { useReply } from "context/ReplyContext";

export default function Content() {
  const { tweet } = useTweet();
  const { replyModal, setReplyModal } = useReply();

  // 設定時間格式
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
  // Back to last page
  function backToLastPage() {
    window.history.back();
  }

  return (
    <div className="tweet_content">
      <div className="banner_div">
        <span className="back_btn" onClick={backToLastPage}>
          <IconLeftArrow />
        </span>
        <h4 className="banner">推文</h4>
      </div>
      <div className="post_div">
        {/* Header */}
        <div className="post_header">
          <span className="avatar_span">
            {tweet.User.avatar ? (
              <img
                className="avatar_img"
                src={tweet.User.avatar}
                alt="user_avatar"
              />
            ) : (
              <IconAvatar className="avatar_img" />
            )}
          </span>
          <span className="user_info">
            <p className="name">{tweet.User.name}</p>
            <p className="account">@{tweet.User.account}</p>
          </span>
        </div>

        {/* Body */}
        <div className="post_body">
          <p className="post_content">{tweet.description}</p>
          <span className="post_datetime">
            <p className="post_time">{relativeTime}</p>
            {/* <p>‧</p>
            <p className='post_date'>2023年3月22日</p> */}
          </span>
        </div>

        {/* Footer */}
        <div className="btn_footer">
          <div className="post_info">
            <span>
              <p className="reply_count">{tweet.reply_count}</p>
              回覆
            </span>
            <span>
              <p className="like_count">{tweet.like_count}</p>
              喜歡次數
            </span>
          </div>
          <div className="icon_div">
            <span className="reply_icon">
              <IconReply
                onClick={() => {
                  setReplyModal(true);
                }}
              />
            </span>
            <span>
              {tweet.is_liked ? (
                <IconLike className="like_icon" />
              ) : (
                <IconLikeLight className="unlike_icon" />
              )}
            </span>
          </div>

        </div>
      </div>
      
      {tweet.Replies.length !== 0 ? (
        
        <ReplyList reply_data={tweet.Replies} current_page='tweet_content' replyOwner={tweet.User.account}/>
      ) : (
        <div className="reply_msg">
          <h3>還沒有人來留言~</h3>
        </div>
      )}

      {replyModal && <ReplyModal />}
    </div>
  );
}
