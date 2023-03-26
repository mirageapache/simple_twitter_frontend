import { useState } from 'react';
import { useAuth } from "context/AuthContext";

// svg
import { ReactComponent as IconClose } from 'assets/icons/close.svg';
import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg'

export default function TweetModal({onModalToggle}) {
  const [words, setWords] = useState(0);
  const { currentMember } = useAuth();

  // 判斷推文內容是否超過140字
  function wordsChange(e){
    const text_length = e.target.value
    setWords(text_length.length)
  }

  return(
    <div className="tweet_modal">
      <div className="gray_panel" onClick={() => {onModalToggle()}}></div>
      <div className="modal_panel">
        <div className="modal_header">
          <span className="close_btn" onClick={() => {onModalToggle()}}>
            <IconClose />
          </span>
        </div>
        <div className="modal_body">
          <div className='avatar_div'>
            { currentMember?
              <img className='avatar' src={currentMember.avatar} alt="user_avatar" />
            :
              <IconAvatar className='avatar' />
            }   
          </div>
          <div className='text_div'>
            <textarea className='content_text' name="" cols="60" rows="5" placeholder='有什麼新鮮事？' onChange={e=>{wordsChange(e)}}></textarea>
          </div>
        </div>
        <div className='modal_footer'>

          {words > 140 ?
            <>
              <p className='tip_text'>字數不可超140字</p>
              <button className='submit_btn' disabled='ture'>推文</button>
            </>
          :
            <button className='submit_btn'>推文</button>
          }
        </div>
      </div>
    </div>
  )
}