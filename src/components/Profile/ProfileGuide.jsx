// svg
import { ReactComponent as IconBack } from "assets/icons/left_arrow.svg";
// style
import "styles/profileGuide.css";

function ProfileGuide({ data }) {
  let user = data;

  function backToLastPage() {
    window.history.back();
  }

  return (
    <div className="guide-container">
      <IconBack className="icon-svg-left" onClick={backToLastPage} />
      <div className="user-summary">
        <h5 className="user-name">{user.name}</h5>
        <p className="user-tweet">{user.tweet_count}推文</p>
      </div>
    </div>
  );
}
export default ProfileGuide;
