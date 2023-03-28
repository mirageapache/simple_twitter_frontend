import { useState } from 'react';
import { useAuth } from "context/AuthContext";
import { useTweet } from "context/TweetContext";
import { addTweetAPI } from 'api/main';

// svg
import { ReactComponent as IconClose } from 'assets/icons/close.svg';
import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg'

export default function TweetModal({onModalToggle}) {
  const [postContent, setPostContent] = useState('');
  const { currentMember } = useAuth();
  const { setTweetList } = useTweet();

  // 新增推文
  async function addTweet(){
    // 資料驗證
    if(postContent.length  === 0){
      alert('請撰寫推文內容！')
      return
    }
    if(postContent.length > 140){
      alert('推文字數不可超140字！')
      return
    }
    const result = await addTweetAPI({description:postContent});
    if(result.status === 200){
      const newTweet = result.data.data.tweet;
      setTweetList((tweetList) => {
        return [
          {
            id: newTweet.id,
            description: newTweet.description,
            createdAt: newTweet.createdAt,
            updatedAt: newTweet.updatedAt,
            reply_count: 0,
            like_count:0,
            is_liked: 0,
            User:{
              id: currentMember.id,
              name: currentMember.name,
              account: currentMember.account,
              avatar: currentMember.avatar
            }
          },
          ...tweetList
        ];
      });
      setPostContent('');
      alert('發文成功！');
      onModalToggle();
    }
    else{
      alert('發生了一些錯誤，請再嘗試一次！')
    }
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
            <textarea 
              className='content_text' 
              name="" 
              cols="60" 
              rows="5" 
              placeholder='有什麼新鮮事？' 
              onChange={(e) => {setPostContent(e.target.value)}}
              value={postContent}
            ></textarea>
          </div>
        </div>
        <div className='modal_footer'>
          {postContent.length > 140 ?
            <>
              <p className='tip_text'>推文字數不可超過140字</p>
              <button className='submit_btn' disabled='ture'>推文</button>
            </>
          :
            <button className='submit_btn' onClick={addTweet}>推文</button>
          }
        </div>
      </div>
    </div>
  )
}