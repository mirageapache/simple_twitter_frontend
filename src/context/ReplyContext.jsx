import { createContext, useContext, useState } from "react";
// import { useTweet } from "./TweetContext";
// import { getTweetAPI } from "api/main";

const defaultValue = {
  reply:{},
  replyList: [],
  replyModal: false,
};

const ReplyContext = createContext(defaultValue);

export const useReply = () => useContext(ReplyContext);

export const ReplyProvider = ({ children }) => {
  const [reply, setReply] = useState({}); //單一則回覆
  const [replyList, setReplyList] = useState([]); //回覆列表
  const [replyModal, setReplyModal] = useState(false); //ReplyModal Toggle
  // const { currentTweet_id, setTweet } = useTweet();

  return (
    <ReplyContext.Provider 
      value={{
        reply,
        setReply,
        replyList,
        setReplyList,
        replyModal,
        setReplyModal, 
      }}
    >
      {children}
    </ReplyContext.Provider>
  );
};
