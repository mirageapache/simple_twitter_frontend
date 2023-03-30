import { useState } from "react";
import { createFollowShipAPI, unFollowAPI } from "api/userfollow";
import { useNoti } from "context/NotiContext";
import "styles/follow_btn.css";
// svg
import { ReactComponent as IconNotificationOK } from "assets/icons/notification_ok.svg";
import { ReactComponent as IconMailLight } from "assets/icons/mail_light.svg";

export default function Interactive({ id, state }) {
  const [isFollow, setIsFollow] = useState(state);
  const { setIsAlert, setNotiMessage } = useNoti();

  function handleFollowShip(id, state) {
    async function toggleFollowShip(id, state) {
      try {
        const result = state
          ? await unFollowAPI(id)
          : await createFollowShipAPI(id);
        if (result.status === "success") {
          // 設定通知訊息
          state
            ? setNotiMessage({ type: "info", message: "已取消跟隨！" })
            : setNotiMessage({ type: "success", message: "已跟随！" });
          setIsAlert(true);
          setIsFollow(!isFollow);
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
      {isFollow ? (
        <button
          type="button"
          className="followStatus_button_active"
          onClick={() => {
            handleFollowShip(id, isFollow);
          }}
        >
          正在跟隨
        </button>
      ) : (
        <button
          type="button"
          className="followStatus_button"
          onClick={() => {
            handleFollowShip(id, isFollow);
          }}
        >
          跟隨
        </button>
      )}
    </div>
  );
}
