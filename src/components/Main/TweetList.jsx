import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg';
import { ReactComponent as IconReply } from 'assets/icons/reply.svg';
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

  return(
    <div className="tweet_item">
      <div className='avatar_div'>
        { data.User.avatar ?
          <img className='avatar_img' src={data.User.avatar} alt="user_avatar" />
        :
          <IconAvatar />
        }
      </div>
      <div className='text_div'>
        <div className='card_header'>
          <p className='user_name'>{data.User.name}</p>
          <p className='user_account'>@{data.User.account}‧{data.createdAt}</p>
        </div>
        <div className='card_body'>
          <p className='tweet_content'>{data.description}</p>
        </div>
        <div className='card_footer'>
          <span className='reply_span'>
            <IconReply />
            <p>{data.reply_count}</p>
          </span>
          <span className='like_span'>
            <IconLikeLight />
            <p>{data.like_count}</p>
          </span>
        </div>
      </div>
    </div>
  )
}