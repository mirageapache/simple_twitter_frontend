import { ReplyList, ReplyModal } from 'components';

import 'styles/reply_content.css';

import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg';
import { ReactComponent as IconLeftArrow } from 'assets/icons/left_arrow.svg';
import { ReactComponent as IconReply } from 'assets/icons/reply.svg';
import { ReactComponent as IconLike } from 'assets/icons/like_light.svg';
import { useState } from 'react';

export default function Content() {
  // Modal toggle
  const [modal_toggle, setModalToggle] = useState(false);

  function backToLastPage(){
    window.history.back();
  }

  // Modal toggle Function
  function onModalToggle(){
    setModalToggle(!modal_toggle);
  }


  return(
    <div className='reply_content'>
      <div className='banner_div'>
        <span className='back_btn' onClick={backToLastPage}>
          <IconLeftArrow />
        </span>
        <h4 className="banner">推文</h4>
      </div>
      <div className="post_div">
        {/* Header */}
        <div className='post_header'>
          <span className='avatar_span'>
            {/* <img className='avatar' src="" alt="" /> */}
            <IconAvatar />
          </span>
          <span className='user_info'>
            <p className='name'>Apple</p>
            <p className='account'>@apple</p>
          </span> 
        </div>

        {/* Body */}
        <div className='post_body'>
          <p className='post_content'>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt.</p>
          <span className='post_datetime'>
            <p className='post_time'>上午10:05</p>
            <p>‧</p>
            <p className='post_date'>2023年3月22日</p>
          </span>
        </div>

        {/* Footer */}
        <div className='btn_footer'>
          <div className='post_info'>
            <span>
              <p className='reply_count'>34</p>
              回覆
            </span>
            <span>
              <p className='like_count'>808</p>
              喜歡次數
            </span>
          </div>
          <div className='icon_div'>
            <span className='reply_icon' onClick={onModalToggle}>
              <IconReply />
            </span>
            <span className='like_icon'>
              <IconLike />
            </span>
          </div>
        </div>
      </div>
      <ReplyList />

      { modal_toggle && <ReplyModal onModalToggle={onModalToggle} /> }
    </div>
  )
}