import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg';
import { ReactComponent as IconReply } from 'assets/icons/reply.svg';
import { ReactComponent as IconLikeLight } from 'assets/icons/like_light.svg';

const dummy_tweet = [
  {account:'apple',name:'Apple',content:'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitationincididunt aliquip deserunt reprehenderit elit laborum.',create_at:'3小時',reply_count:'13',like_count:'76'},
  {account:'apple',name:'Apple',content:'post1 content',create_at:'3小時',reply_count:'13',like_count:'76'},
  {account:'apple',name:'Apple',content:'post2 content',create_at:'3小時',reply_count:'13',like_count:'76'},
  {account:'apple',name:'Apple',content:'post3 content',create_at:'3小時',reply_count:'13',like_count:'76'},
  {account:'apple',name:'Apple',content:'post4 content',create_at:'3小時',reply_count:'13',like_count:'76'},
  {account:'apple',name:'Apple',content:'post5 content',create_at:'3小時',reply_count:'13',like_count:'76'}
]


export default function TweetList() {

  const tweet = dummy_tweet.map((item, index) => {
    return <TweetItem key={index} data={item}/>
  })

  return(
    <div className="tweet_list">
      {tweet}
    </div>
  )
}


function TweetItem({data}) {

  return(
    <div className="tweet_item">
      <div className='avatar_div'>
        <IconAvatar />
      </div>
      <div className='text_div'>
        <div className='card_header'>
          <p className='user_name'>{data.name}</p>
          <p className='user_account'>@{data.account}‧{data.create_at}</p>
        </div>
        <div className='card_body'>
          <p className='tweet_content'>{data.content}</p>
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