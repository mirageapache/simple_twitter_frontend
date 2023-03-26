import { TweetList } from 'components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTweetListAPI } from 'api/main'

import 'styles/main_content.css';

import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg'

export default function MainContent() {
  const navigate = useNavigate();
  // 使用者的資料(頭貼、id等)
  const [userData, setUserData] = useState([]);
  const [tweetList, setTweetList] = useState([]);

  async function getTweetList(){
      const result = await getTweetListAPI();
      console.log(result)
      if(result.status === 'error'){
        // AuthToken 驗證失敗
        localStorage.removeItem('AuthToken');
        alert('身分驗證失敗，請重新登入！')
        navigate('/login')
      }else{
        setTweetList(result)
      }

    }

    getTweetList()

  useEffect(() => {
    
  })

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