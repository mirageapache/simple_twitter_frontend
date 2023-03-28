import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg';
import { useReply } from 'context/ReplyContext';
import moment from 'moment';

export default function ReplyList() {
  const { replyList } = useReply();

  console.log(replyList)

  const reply = replyList.map((item) => {
    return <ReplyItem key={item.id} data={item} />
  })

  return(
    <div className="reply_list">
      {reply}
    </div>
  )
}


function ReplyItem({ data }) {
  // 設定時間格式
  let rowRelativeTime = moment(data.updatedAt).endOf("day").fromNow().trim();
  let hourIndex = rowRelativeTime.indexOf("h");
  let relativeTime =
    rowRelativeTime.slice(0, hourIndex) <= 24
      ? rowRelativeTime
      : moment(data.updatedAt).format("LLL");

  return(
    <div className="reply_item">
      {/* Avatar */}
      <div className='avatar_div'>
        { data.User.avatar?
          <img className='avatar_img' src={data.User.avatar} alt="user_avatar" />
        :
          <IconAvatar className='avatar_img' />
        }
      </div>
      <div className='text_div'>
        {/* Item Header */}
        <div className='card_header'>
          <p className='user_name'>{data.User.name}</p>
          <p className='user_account'>@{data.User.account}</p>
          <p className='reply_time'>‧{relativeTime}</p>
        </div>

        {/* Item Body */}
        <div className='card_body'>
          <span className='reply_to'>
            回覆
            <p className='post_owner'>@{data.Tweet.User.account}</p>
          </span>
          <p className='reply_text'>{data.comment}</p>
        </div>

      </div>
    </div>
  )
}