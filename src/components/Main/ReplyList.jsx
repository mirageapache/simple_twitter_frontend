import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg';
import { ReactComponent as IconReply } from 'assets/icons/reply.svg';
import { ReactComponent as IconLikeLight } from 'assets/icons/like_light.svg';

const dummy_reply = [
  {account:'devon_lane',name:'Devon Lane',content:'reply1 content',create_at:'3小時',reply_to:'apple',like_count:'76'},
  {account:'iamjane1999',name:'Jane Cathy',content:'reply2 cofgergvdzgr etewfv gwet3ewfffdadfdsf dsaf dsfsdaf sdfds fdsfsafs fds afdfntent',create_at:'3小時',reply_to:'apple',like_count:'76'},
  {account:'MMCK',name:'Marvin McKinney',content:'reply3 content',create_at:'3小時',reply_to:'apple',like_count:'76'},
  {account:'LeslieAlex',name:'Leslie Alexander',content:'reply4 content',create_at:'3小時',reply_to:'apple',like_count:'76'},
  {account:'JaneCoooo',name:'Jane Cooper',content:'reply5 content',create_at:'3小時',reply_to:'apple',like_count:'76'}
]


export default function ReplyList() {

  const reply = dummy_reply.map((item, index) => {
    return <ReplyItem key={index} data={item}/>
  })

  return(
    <div className="reply_list">
      {reply}
    </div>
  )
}


function ReplyItem({data}) {

  return(
    <div className="reply_item">
      {/* Avatar */}
      <div className='avatar_div'>
        <IconAvatar />
      </div>
      <div className='text_div'>
        {/* Item Header */}
        <div className='card_header'>
          <p className='user_name'>{data.name}</p>
          <p className='user_account'>@{data.account}‧{data.create_at}</p>
        </div>

        {/* Item Body */}
        <div className='card_body'>
          <span className='reply_to'>
            回覆
            <p className='post_owner'>@{data.reply_to}</p>
          </span>
          <p className='reply_text'>{data.content}</p>
        </div>

      </div>
    </div>
  )
}