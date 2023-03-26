import { createContext, useContext, useState } from "react";

const defaultTweetContext = {
  tweetList: [],
  modalToggle: false,
};
const TweetContext = createContext(defaultTweetContext);

export const useTweet = () => useContext(TweetContext);

export const TweetProvider = ({ children }) => {
  const [tweetList, setTweetList] = useState([]);
  const [modalToggle, setModalToggle] = useState(false);


  // useEffect(() => {
    
  // }, []);

  return (
    <TweetContext.Provider
      value={{
        tweetList,
        setTweetList,
        modalToggle,
        setModalToggle
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};
