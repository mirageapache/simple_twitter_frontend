import { TweetList,TweetModal } from 'components';
import { useState } from 'react';

import 'styles/main_content.css';

import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg'

export default function MainContent() {
  // TweetModal toggle
  const [modal_toggle, setModalToggle] = useState(false);

  function onModalToggle(){
    setModalToggle(!modal_toggle);
  }

  return(
    <div className='main_content'>
      <div className='banner_div'>
        <h4 className="banner">首頁</h4>
      </div>
      <div className="post_div">
        <div className='posting'>
          <span className='avatar_span'>
            {/* <img className='avatar' src="" alt="" /> */}
            <IconAvatar />
          </span>
          <h5 className='posting_text'>有什麼新鮮事？</h5>
        </div>
        <div className='btn_div'>
          <button className='post_btn' onClick={onModalToggle} >推文</button>
        </div>
      </div>
      <TweetList />

      { modal_toggle && <TweetModal onModalToggle={onModalToggle} /> }
    </div>
  )
}