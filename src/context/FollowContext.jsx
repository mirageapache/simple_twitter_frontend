import { useState } from "react";
import { createContext, useContext } from "react";

const defaultFollow = {
  //   data
  toggleFollowed: null,
  // 方法
  reRnenderFollow: null,
};

const FollowContext = createContext(defaultFollow);

export const useFollow = () => useContext(FollowContext);

export const FollowProvider = ({ children }) => {
  const [toggleFollowed, setToggleFollowed] = useState(false);
  return (
    <FollowContext.Provider
      value={{
        toggleFollowed,
        setToggleFollowed,
        toggleRenderFollow: (result) => {
          if (result) {
            setToggleFollowed(!toggleFollowed);
          }
        },
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
