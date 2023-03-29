import "styles/app.css";
import { useNoti } from "context/NotiContext";
import { useEffect } from "react";
//svg
import { ReactComponent as IconNotiSuccess } from "assets/icons/success.svg";
import { ReactComponent as IconNotiError } from "assets/icons/error.svg";
import { ReactComponent as IconNotiWarning } from "assets/icons/warning.svg";
import { ReactComponent as IconNotiInfo } from "assets/icons/info.svg";


export default function Notification() {
  const { is_alert, setIsAlert, noti_message } = useNoti();
  let icon = "";

  switch (noti_message.type) {
    case "success":
      icon = (
        <span className="noti_icon success_icon">
          <IconNotiSuccess />
        </span>
      );
      break;
    case "error":
      icon = (
        <span className="noti_icon error_icon">
          {" "}
          <IconNotiError />
        </span>
      );
      break;
    case "warning":
      icon = (
        <span className="noti_icon warning_icon">
          {" "}
          <IconNotiWarning />
        </span>
      );
      break;
    case "info":
      icon = (
        <span className="noti_icon info_icon">
          {" "}
          <IconNotiInfo />
        </span>
      );
      break;
    default:
      icon = <></>;
      break;
  }

  useEffect(() => {
    if(is_alert){
      setTimeout(() => {
        setIsAlert(false);
      }, 1500);
    }
  },[is_alert, setIsAlert]);

  return (
    <div className="notification">
      <p className="noti_text">{noti_message.message}</p>
      {icon}
    </div>
  );
}
