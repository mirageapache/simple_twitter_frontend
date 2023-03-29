import "styles/follow_btn.css";
// svg
import { ReactComponent as IconNotificationOK } from "assets/icons/notification_ok.svg";
import { ReactComponent as IconMailLight } from "assets/icons/mail_light.svg";

export default function Interactive({ id, state }) {
  function handleFollowShip(id, state) {
    // console.log("here");
    // console.log(id);
    // console.log(state);
    console.log("here");
    console.log(id);
    console.log(state);
  }
  return (
    <div className="interactive">
      <IconMailLight className="interact-icon" />
      <IconNotificationOK className="interact-icon interact-icon-active" />
      {state ? (
        <button
          type="button"
          className="followStatus_button_active"
          onClick={() => {
            handleFollowShip(id, state);
          }}
        >
          正在跟隨
        </button>
      ) : (
        <button
          type="button"
          className="followStatus_button"
          onClick={() => {
            handleFollowShip(id, state);
          }}
        >
          跟隨
        </button>
      )}
    </div>
  );
}
