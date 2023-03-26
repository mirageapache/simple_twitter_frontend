import { TweetList } from 'components';
import { useEffect, useState } from 'react';
import { getTweetListAPI, addTweetAPI } from 'api/main';
import { useAuth } from "context/AuthContext";
import { useTweet } from 'context/TweetContext';
// style
import "styles/main_content.css";
// svg
import { ReactComponent as IconAvatar } from "assets/icons/avatar.svg";

export default function MainContent() {
  const { tweetList, setTweetList } = useTweet();
  const [postContent, setPostContent] = useState('')
  const { currentMember } = useAuth();

  useEffect(() => {
    // get TweetList
    async function getTweetList(){
      const result = await getTweetListAPI();
      console.log(result)
      if(result.status === 'error'){
      }else{
        setTweetList(result)
      }
    }
    getTweetList()
  },[setTweetList])


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
    if(result.status === 'success'){
      const newTweet = result.data.tweet;
      setTweetList((prevTweet) => {
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
          ...prevTweet
        ];
      });
      setPostContent('');
      alert('發文成功！');
      
    }
    else{
      alert('發生了一些錯誤，請再嘗試一次！')
    }
  }

  return (
    <div className="main_content">
      <div className="banner_div">
        <h4 className="banner">首頁</h4>
      </div>
      <div className="post_div">
        <div className='posting'>
          <span className='avatar_span'>
            { currentMember?
              <img className='avatar' src={currentMember.avatar} alt="user_avatar" />
            :
              <IconAvatar />
            }
          </span>
          <textarea 
            className='posting_text' 
            placeholder='有什麼新鮮事？' 
            cols="60" 
            rows="3"
            onChange={(e) => {setPostContent(e.target.value)}}
            value={postContent}
          ></textarea>
        
        </div>
        <div className='btn_div'>
          {/* 判斷推文內容是否超過140字 */}
          {postContent.length > 140 ?
            <>
              <p className='tip_text'>推文字數不可超過140字</p>
              <button className='post_btn' disabled='ture'>推文</button>
            </>
          :
            <button className='post_btn' onClick={addTweet}>推文</button>
          }
        </div>
      </div>
      <TweetList list_data={tweetList} />      
    </div>
  );
}
