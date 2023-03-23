import { ReactComponent as IconClose } from 'assets/icons/close.svg';
import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg'
import { useState } from 'react';

export default function ReplyModal({onModalToggle}) {
  const [words, setWords] = useState(0);

  // 判斷推文內容是否超過140字
  function wordsChange(e){
    const text_length = e.target.value
    setWords(text_length.length)
  }

  return(
    <div className="reply_modal">
      <div className="gray_panel" onClick={() => {onModalToggle()}}></div>
      <div className="modal_panel">
        <div className="modal_header">
          <span className="close_btn" onClick={() => {onModalToggle()}}>
            <IconClose />
          </span>
        </div>
        <div className="modal_body">
          {/* 推文區塊 */}
          <div className='tweet_content'>
            <div className="post_div">
              <div className='post_avatar'>
                {/* <img className='avatar' src="" alt="" /> */}
                <IconAvatar />
                <span className='style_square'>
                  <span className='style_bar'> </span>
                </span>
              </div>
              <div className='post_text'>
                <div className='user_info'>
                  <p className='name'>Apple</p>
                  <p className='account'>@apple‧3小時</p>
                </div> 
                <p className='post_content'>Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitationincididunt aliquip deserunt reprehenderit elit laborum.</p>
                <div className='reply_to'>
                  回覆給
                  <p className='post_owner'>@apple</p>
                </div>
              </div>
            </div>
          </div>

          {/* 回覆區塊 */}
          <div className='reply_area'>
            <div className='avatar_div'>
              <span className='avatar'>
                <IconAvatar />
              </span>
            </div>
            <div className='text_div'>
              <textarea className='content_text' name="" id="" cols="60" rows="5" placeholder='推你的回覆' onChange={e=>{wordsChange(e)}}></textarea>
            </div>
            
          </div>
          <div className='modal_footer'>
              {words > 140 ?
                <>
                  <p className='tip_text'>字數不可超140字</p>
                  <button className='submit_btn' disabled='ture'>回覆</button>
                </>
              :
                <button className='submit_btn'>回覆</button>
              }
            </div>
        </div>
      </div>
    </div>
  )
}