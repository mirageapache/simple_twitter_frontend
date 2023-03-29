import { useState } from "react";
import { useTweet } from "context/TweetContext";
import { useAuth } from "context/AuthContext";
import { addReplyAPI } from "api/main";
import { useReply } from "context/ReplyContext";
import { useNoti } from "context/NotiContext";
import moment from "moment";
import 'styles/tweet_content.css'
// svg
import { ReactComponent as IconClose } from "assets/icons/close.svg";
import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";

export default function ReplyModal() {
  const [comment, setComment] = useState("");
  const { currentMember } = useAuth();
  const { tweet, setTweet, setTweetList } = useTweet();
  const { setReplyList, setReplyModal } = useReply();
  const { setIsAlert, setNotiMessage } = useNoti();

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
    <div className="main_reply_modal">
      <div
        className="gray_panel"
        onClick={() => {
          setReplyModal(false);
        }}
      ></div>
      <div className="modal_panel">
        <div className="modal_header">
          <span
            className="close_btn"
            onClick={() => {
              setReplyModal(false);
            }}
          >
            <IconClose />
          </span>
        </div>
        <div className="modal_body">
          {/* 推文區塊 */}
          <div className="tweet_content">
            <div className="post_div">
              <div className="post_avatar">
                {tweet.User.avatar ? (
                  <img
                    className="avatar_img"
                    src={tweet.User.avatar}
                    alt="user_avatar"
                  />
                ) : (
                  <IconAvatar className="avatar_img" />
                )}
                <span className="style_square">
                  <span className="style_bar"> </span>
                </span>
              </div>
              <div className="post_text">
                <div className="post_owner_info">
                  <p className="name">{tweet.User.name}</p>
                  <p className="account">{tweet.User.account}</p>
                  <p className="time">‧{relativeTime}</p>
                </div>
                <p className="post_content">{tweet.description}</p>
                <div className="reply_to">
                  回覆給
                  <p className="post_owner">@{tweet.User.account}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 回覆區塊 */}
          <div className="reply_area">
            <div className="avatar_div">
              {currentMember.avatar ? (
                <img
                  className="replier_avatar"
                  src={currentMember.avatar}
                  alt="user_avatar"
                />
              ) : (
                <IconAvatar className="replier_avatar" />
              )}
            </div>
            <div className="text_div">
              <textarea
                className="content_text"
                cols="60"
                rows="5"
                placeholder="推你的回覆"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
              ></textarea>
            </div>
          </div>
          <div className="modal_footer">
            {comment.length > 140 ? (
              <>
                <p className="tip_text">回覆內容字數不可超過140字</p>
                <button className="submit_btn" disabled="ture">
                  回覆
                </button>
              </>
            ) : (
              <button className="submit_btn" onClick={addReply}>
                回覆
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
