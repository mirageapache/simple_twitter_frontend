import { useEffect, useState } from "react";
import { getUserDataAPI } from "api/userProfile";
import { createFollowShipAPI, unFollowAPI } from "api/userfollow";
import { useNoti } from "context/NotiContext";
import { useRecommend } from "context/RecommendContext";
import { useFollow } from "context/FollowContext";
import "styles/follow_btn.css";
// svg
import { ReactComponent as IconNotificationOK } from "assets/icons/notification_ok.svg";
import { ReactComponent as IconMailLight } from "assets/icons/mail_light.svg";

export default function Interactive({ id }) {
  const { setIsAlert, setNotiMessage } = useNoti();
  const { renewRecommendList } = useRecommend();
  const { toggleFollowed } = useFollow();
  const [isFollowed, setIsFollowed] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const result = await getUserDataAPI(id);
        if (result.status === 200) {
          setIsFollowed(result?.data?.is_followed);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getProfileData();
  }, [id, toggleFollowed]);

  function handleFollowShip(id, state) {
    async function toggleFollowShip(id, state) {
      try {
        const result = state
          ? await unFollowAPI(id)
          : await createFollowShipAPI(id);
        if (result?.status === "success") {
          // 設定通知訊息
          state
            ? setNotiMessage({ type: "info", message: "已取消跟隨！" })
            : setNotiMessage({ type: "success", message: "已跟随！" });
          setIsAlert(true);
          setIsFollowed(!state);
          renewRecommendList(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    toggleFollowShip(id, state);
  }
  return (
    <div className="interactive">
      <IconMailLight className="interact-icon" />
      <IconNotificationOK className="interact-icon interact-icon-active" />
      {isFollowed ? (
        <button
          type="button"
          className="followStatus_button_active"
          onClick={() => {
            handleFollowShip(id, isFollowed);
          }}
        >
          正在跟隨
        </button>
      ) : (
        <button
          type="button"
          className="followStatus_button"
          onClick={() => {
            handleFollowShip(id, isFollowed);
          }}
        >
          跟隨
        </button>
      )}
    </div>
  );
}
