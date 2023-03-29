import { useState } from "react";
import { useTweet } from "context/TweetContext";
import { useAuth } from "context/AuthContext";
import { addReplyAPI } from "api/main";
import { useReply } from "context/ReplyContext";
import { useNoti } from "context/NotiContext";
import moment from "moment";
// svg
import { ReactComponent as IconClose } from "assets/icons/close.svg";
import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";

export default function ReplyModal() {
  const [comment, setComment] = useState("");
  const { currentMember } = useAuth();
  const { tweet, setTweet, setTweetList } = useTweet();
  const { setReplyList, setReplyModal } = useReply();
  const { setIsAlert, setNotiMessage } = useNoti();

  // const reply = replyList.map((item) => {
    // return <ReplyItem key={item.id} data={item} />;
    // });
    // return <div className="reply_list">{reply}</div>;
  // }

function ReplyItem({ data }) {
  // 設定時間格式
  let rowRelativeTime = moment(data.updatedAt)
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
    // relativeTime = moment(data.updatedAt).format("LLL");
    relativeTime = moment(tweet.updatedAt).format("LLL");
  }
  // 新增回覆
  async function addReply() {
    // 資料驗證
    if (comment.length === 0) {
      setNotiMessage({type:"error", message:"請輸入回覆內容！"});
      return;
    }
    if (comment.length > 140) {
      setNotiMessage({type:"error", message:"回覆內容字數不可超過140字！"});
      return;
    }

    // fetch add reply API
    const result = await addReplyAPI({ tweet_id: tweet.id, comment });
    if (result.status === 200) {
      const new_reply = result.data;
      setNotiMessage({type:"success", message:"你回覆一則留言！"});
      setIsAlert(true);
      setTweet((prevData) => {
        return {
          ...prevData,
          reply_count: prevData.reply_count + 1,
        };
      });
      setTweetList((prevData) => {
        return prevData.map((item) => {
          if (item.id.toString() === new_reply.TweetId) {
            return {
              ...item,
              reply_count: item.reply_count + 1,
            };
          } else {
            return item;
          }
        });
      });
      setReplyList((prevData) => {
        return [
          ...prevData,
          {
            id: new_reply.id,
            UserId: new_reply.UserId,
            comment: new_reply.comment,
            createdAt: new_reply.createdAt,
            updatedAt: new_reply.updatedAt,
            User: {
              id: currentMember.id,
              name: currentMember.name,
              account: currentMember.account,
              avatar: currentMember.avatar,
            },
          },
        ];
      });
      setComment("");
      setReplyModal(false);
    }
  }

  return (
    <div className="reply_item">
      {/* Avatar */}
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
        {/* Item Header */}
        <div className="card_header">
          <p className="user_name">{data.User.name}</p>
          <p className="user_account">@{data.User.account}</p>
          <p className="reply_time">‧{relativeTime}</p>
        </div>

        {/* Item Body */}
        <div className="card_body">
          <span className="reply_to">
            回覆
            <p className="post_owner">@{data.Tweet.User.account}</p>
          </span>
          <p className="reply_text">{data.comment}</p>
        </div>
      </div>
    </div>
  );
}
