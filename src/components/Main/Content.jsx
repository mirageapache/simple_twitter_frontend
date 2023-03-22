import { TweetList,TweetModal } from 'components';

import 'styles/content.css';

import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg'
import { useState } from 'react';

export default function Content() {
  // TweetModal toggle
  const [modal_toggle, setModalToggle] = useState(false);

  function TweetModalToggle(){
    setModalToggle(!modal_toggle);
  }

  return(
    <>
      <h4 className="banner">首頁</h4>
      <div className="post_div">
        <div className='posting'>
          <span className='avatar_span'>
            {/* <img className='avatar' src="" alt="" /> */}
            <IconAvatar />
          </span>
          <h5 className='posting_text'>有什麼新鮮事？</h5>
        </div>
        <div className='btn_div'>
          <button className='post_btn' onClick={TweetModalToggle} >推文</button>
        </div>
      </div>
      <TweetList />

      { modal_toggle && <TweetModal TweetModalToggle={TweetModalToggle} /> }
    </>
  )
}