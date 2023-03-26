import { TweetList } from 'components';
import { useEffect, useState } from 'react';
import { getTweetListAPI } from 'api/main';
import { useAuth } from "context/AuthContext";

import 'styles/main_content.css';

import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg'

export default function MainContent() {
  const [tweetList, setTweetList] = useState([]);
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
  },[])

  return(
    <div className='main_content'>
      <div className='banner_div'>
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
          <textarea className='posting_text' placeholder='有什麼新鮮事？' cols="60" rows="3"></textarea>
        
        </div>
        <div className='btn_div'>
          <button className='post_btn' >推文</button>
        </div>
      </div>
      <TweetList list_data={tweetList} />      
    </div>
  )
}