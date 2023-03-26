import moment from "moment";

// svg
import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg';
import { ReactComponent as IconReply } from 'assets/icons/reply.svg';
import { ReactComponent as IconLike } from 'assets/icons/like.svg';
import { ReactComponent as IconLikeLight } from 'assets/icons/like_light.svg';

export default function TweetList({list_data}) {
  const tweet = list_data.map((item) => {
    return <TweetItem key={item.id} data={item} />
  })

  return(
    <div className="tweet_list">
      {tweet}
    </div>
  )
}

function TweetItem({ data }) {
  // 設定時間格式
  let rowRelativeTime = moment(data.updatedAt).endOf("day").fromNow().trim();
  let hourIndex = rowRelativeTime.indexOf("h");
  let relativeTime =
    rowRelativeTime.slice(0, hourIndex) <= 24
      ? rowRelativeTime
      : moment(data.updatedAt).format("LLL");


  return(
    <div className="tweet_item">
      <div className='avatar_div'>
        { data.User.avatar ?
          <img className='avatar_img' src={data.User.avatar} alt="user_avatar" />
        :
          <IconAvatar className='avatar_img' />
        }
      </div>
      <div className='text_div'>
        <div className='card_header'>
          <p className='user_name'>{data.User.name}</p>
          <span className='user_span'>
            <p className="user_account">@{data.User.account}</p>
            <p className="post_time">‧{relativeTime}</p>
          </span>
        </div>
        <div className='card_body'>
          <p className='tweet_content'>{data.description}</p>
        </div>
        <div className='card_footer'>
          <span className='reply_span'>
            <IconReply className='reply_icon' />
            <p>{data.reply_count}</p>
          </span>
          <span className='like_span'>
            {data.is_like?
              <IconLike className='like_icon' />
            :
              <IconLikeLight className='unlike_icon' />
            }
            <p>{data.like_count}</p>
          </span>
        </div>
      </div>
    </div>
  )
}