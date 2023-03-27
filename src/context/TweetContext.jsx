// import { getTweetAPI } from "api/main";
import { createContext, useContext, useState } from "react";

const defaultValue = {
  tweet: [{
    id: 0,
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
    Replies: {}
  }],
  tweetList: [],
};

const TweetContext = createContext(defaultValue);

export const useTweet = () => useContext(TweetContext);

export const TweetProvider = ({ children }) => {
  const [currentTweet_id, setCurrentTweetID] = useState(null); //單一則推文
  const [tweet, setTweet] = useState([]); //單一則推文
  const [tweetList, setTweetList] = useState([]); //推文列表

  return (
    <TweetContext.Provider 
      value={{
        currentTweet_id,
        setCurrentTweetID,
        tweet,
        setTweet,
        tweetList, 
        setTweetList,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
