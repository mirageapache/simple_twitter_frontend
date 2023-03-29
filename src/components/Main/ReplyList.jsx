import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";
import { useReply } from "context/ReplyContext";
import moment from "moment";
import { NavLink } from "react-router-dom";

export default function ReplyList() {
  const { replyList } = useReply();

  const reply = replyList.map((item) => {
    return <ReplyItem key={item?.id} data={item} />;
  });

  return <div className="reply_list">{reply}</div>;
}

function ReplyItem({ data }) {
  // 設定時間格式
  let rowRelativeTime = moment(data?.updatedAt)
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
    relativeTime = moment(data?.updatedAt).format("LLL");
  }

  return (
    <div className="reply_item">
      {/* Avatar */}
      <div className="avatar_div">
        {data?.User?.avatar ? (
          <NavLink to={`/profile/${data?.User?.id}`}>
            <img
              className="avatar_img"
              src={data?.User?.avatar}
              alt="user_avatar"
            />
          </NavLink>
        ) : (
          <IconAvatar className="avatar_img" />
        )}
      </div>
      <div className="text_div">
        {/* Item Header */}
        <div className="card_header">
          <p className="user_name">{data?.User?.name}</p>
          <p className="user_account">@{data?.User?.account}</p>
          <p className="reply_time">‧{relativeTime}</p>
        </div>

        {/* Item Body */}
        <div className="card_body">
          <span className="reply_to">
            回覆
            <p className="post_owner">@{data?.Tweet?.User?.account}</p>
          </span>
          <p className="reply_text">{data?.comment}</p>
        </div>
      </div>
    </div>
  );
}
