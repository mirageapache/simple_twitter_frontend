import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router';

const defaultValue = {
  tweet: {
    id: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    reply_count: 0,
    like_count: 0,
    is_liked: 0,
    User: {
      id: 0,
      name: '',
      account: '',
      avatar: ''
    },
    Replies: []
  },
  tweetList: [],
};

const TweetContext = createContext(defaultValue);

export const useTweet = () => useContext(TweetContext);

export const TweetProvider = ({ children }) => {
  const [tweet, setTweet] = useState({});
  const [tweetList, setTweetList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!tweet){
      navigate('/main');
    }
  },[tweet, navigate])


  return (
    <TweetContext.Provider 
      value={{
        tweet,
        setTweet,
        tweetList, 
        setTweetList 
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
