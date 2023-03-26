// svg
import { ReactComponent as IconNotificationOK } from "assets/icons/notification_ok.svg";
import { ReactComponent as IconMailLight } from "assets/icons/mail_light.svg";

export default function Interactive() {
  return (
    <div className="interactive">
      <IconMailLight className="interact-icon" />
      <IconNotificationOK className="interact-icon interact-icon-active" />
      <button type="button" className="btn-base btn-fill">
        正在跟隨
      </button>
    </div>
  );
}
