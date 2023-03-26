import "styles/app.css";
import { ReactComponent as IconNotiSuccess } from "assets/icons/success.svg";
import {
  useEffect,
  // useState
} from "react";

export default function Notification({ type, text }) {
  // const [showNoti, setShowNoti] = useState(false);
  let icon = "";
  switch (type) {
    case "success":
      icon = (
        <span className="noti_icon success_icon">
          {" "}
          <IconNotiSuccess />
        </span>
      );
      // setShowNoti(true);
      break;
    case "error":
      icon = (
        <span className="noti_icon success_icon">
          {" "}
          <IconNotiSuccess />
        </span>
      );
      // setShowNoti(true);
      break;
    case "warning":
      icon = (
        <span className="noti_icon success_icon">
          {" "}
          <IconNotiSuccess />
        </span>
      );
      // setShowNoti(true);
      break;
    case "info":
      icon = (
        <span className="noti_icon success_icon">
          {" "}
          <IconNotiSuccess />
        </span>
      );
      // setShowNoti(true);
      break;
    default:
      icon = <></>;
      break;
  }

  useEffect(() => {
    // setTimeout(() => {
    //   setShowNoti(false);
    // }, 1500);
  });

  return (
    <div className="notification">
      <p className="noti_text">{text}</p>
      {icon}
    </div>
  );
}
