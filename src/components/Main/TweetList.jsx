import moment from "moment";
import { useNavigate } from "react-router";
import { getTweetAPI } from "api/main";
import { useTweet } from "context/TweetContext";
import { useReply } from "context/ReplyContext";
import ReplyModal from "./ReplyModal";

// svg
import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";
import { ReactComponent as IconReply } from "assets/icons/reply.svg";
import { ReactComponent as IconLike } from "assets/icons/like.svg";
import { ReactComponent as IconLikeLight } from "assets/icons/like_light.svg";

export default function TweetList({ source }) {
  const { replyModal } = useReply();
  const { tweetList } = useTweet();

  const tweet_data = tweetList.map((item) => {
    return <TweetItem key={item.id} data={item} />;
  });

  return (
    <div className="tweet_list">
      {tweet_data}
      {replyModal && <ReplyModal />}
    </div>
  );
}

function TweetItem({ data }) {
  const navigate = useNavigate();
  const { setTweet } = useTweet();
  const { setReplyList, setReplyModal } = useReply();

  // 取得單一筆Tweet
  async function readTweetDetail(tweet_id, type) {
    const result = await getTweetAPI(tweet_id);
    if (result.status === 200) {
      setTweet(result.data); //設定推文資料
      setReplyList(result.data.Replies); //設定該則推文的回覆列表
      if (type === "content") {
        // 導至TweetPage
        navigate(`/tweet/:tweet_id=${tweet_id}`);
      } else {
        setReplyModal(true);
      }
    } else if (result.response.status === 404) {
      alert("找不到推文！");
      return;
    }
  }

  // 設定時間格式
  let rowRelativeTime = moment(data.updatedAt).endOf("day").fromNow().trim();
  let hourIndex = rowRelativeTime.indexOf("h");
  let relativeTime =
    rowRelativeTime.slice(0, hourIndex) <= 24
      ? rowRelativeTime
      : moment(data.updatedAt).format("LLL");

  return (
    <div className="tweet_item">
      <div className="avatar_div">
        {data.User.avatar ? (
          <img
            className="avatar_img"
            src={data.User.avatar}
            alt="user_avatar"
          />
        ) : (
          <IconAvatar className="avatar_img" />
        )}
      </div>
      <div className="text_div">
        <div className="card_header">
          <p className="user_name">{data.User.name}</p>
          <span className="user_span">
            <p className="user_account">@{data.User.account}</p>
            <p className="post_time">‧{relativeTime}</p>
          </span>
        </div>
        <div
          className="card_body"
          onClick={() => {
            readTweetDetail(data.id, "content");
          }}
        >
          <p className="post_content">{data.description}</p>
        </div>
        <div className="card_footer">
          <span className="reply_span">
            <IconReply
              className="reply_icon"
              onClick={() => {
                readTweetDetail(data.id, "reply");
              }}
            />
            <p>{data.reply_count}</p>
          </span>
          <span className="like_span">
            {data.is_liked === 1 ? (
              <IconLike className="like_icon" />
            ) : (
              <IconLikeLight className="unlike_icon" />
            )}
            <p>{data.like_count}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
