import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNoti } from "context/NotiContext";
// api
// api
import {
  getRecommendAPI,
  createFollowShipAPI,
  unFollowAPI,
} from "api/userfollow";

const defaultRecommend = {
  recommendData: null,
  reNewRecommend: null,
};

const RecommendContext = createContext(defaultRecommend);

export const useRecommend = () => useContext(RecommendContext);

export const RecommendProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { setIsAlert, setNotiMessage } = useNoti();
  const [recommendData, setRecommendData] = useState([]); //存取recommend
  const [reNewRecommend, setReNewRecommend] = useState(true); //用toogle來反轉

  // 取得推薦
  useEffect(() => {
    if (isAuthenticated) {
      const getRecommend = async () => {
        try {
          console.log("getRecommend");
          let rawRecommendData = await getRecommendAPI();
          console.log("rawRecommendData", rawRecommendData);
          setRecommendData(rawRecommendData);
          // console.log("rawRecommendData ", rawRecommendData);
        } catch (err) {
          console.log(err);
        }
      };
      getRecommend();
    }
  }, [reNewRecommend, isAuthenticated]);

  return (
    <RecommendContext.Provider
      value={{
        recommendData,
        setRecommendData,
        reNewRecommend,
        setReNewRecommend,
        handleFollowShip: (followShipId, followedState) => {
          // 跟隨、取消
          async function toggleFollowShip(followShipId, followedState) {
            try {
              const result = followedState
                ? await unFollowAPI(followShipId)
                : await createFollowShipAPI(followShipId);
              if (result?.status === "success") {
                // 設定通知訊息
                followedState
                  ? setNotiMessage({ type: "info", message: "已取消跟隨！" })
                  : setNotiMessage({ type: "success", message: "已跟随！" });
                setIsAlert(true);
                // 需要重新取得遠端資料：為了排序
                setReNewRecommend(!reNewRecommend);
              }
            } catch (err) {
              console.log(err);
            }
          }
          toggleFollowShip(followShipId, followedState);
        },
        renewRecommendList: (result) => {
          if (result) {
            setReNewRecommend(!reNewRecommend);
          }
        },
      }}
    >
      {children}
    </RecommendContext.Provider>
  );
};
