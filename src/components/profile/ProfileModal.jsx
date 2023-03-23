// style
import "styles/profileModal.css";

import { ReactComponent as IconClose } from "assets/icons/close.svg";
import { ReactComponent as IconAddPhoto } from "assets/icons/addphoto.svg";

// data
import dummyAvatar from "assets/images/userCard/avatar.jpeg";
import dummyCover from "assets/images/dummy_cover.jpg";

const dummy_cover = dummyCover;
const dummy_avatar = dummyAvatar;
// const dummy_userData = {
//   name: "Tina",
//   introduction:
//     "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ",
// };

export default function ReplyModal({ onModalToggle }) {
  return (
    <div className="reply_modal">
      <div
        className="gray_panel"
        onClick={() => {
          onModalToggle();
        }}
      ></div>
      <div className="modal_panel">
        <div className="modal_header">
          <div className="header-left">
            <span
              className="close_btn"
              onClick={() => {
                onModalToggle();
              }}
            >
              <IconClose />
            </span>
            <h5>編輯個人資料</h5>
          </div>

          <button type="button" className="btn-save">
            儲存
          </button>
        </div>
        <div className="modal_body">
          <div className="cover-wrapper">
            <img
              src={dummy_cover}
              alt="user cover img-gray-panel"
              className="user-cover"
            />
            <span className="cover-gray-panel">
              <div className="edit-setting">
                <IconAddPhoto className="setting-icon-svg add-photo-icon" />
                <IconClose className="setting-icon-svg" />
              </div>
            </span>
          </div>
          <div className="avatar-wrapper">
            <img
              src={dummy_avatar}
              alt="user avatar"
              className="user-avatar avatar-container"
            />
            <span className="avatar-gray-panel">
              <div className="avatar-edit-setting">
                <IconAddPhoto className="setting-icon-svg add-photo-icon" />
              </div>
            </span>
          </div>
          <div className="edit-profile-container">
            <form className="form profile-info-form">
              <div className="input_group">
                <div className="input_div">
                  <label htmlFor="名稱">名稱</label>
                  <input
                    id="名稱"
                    name="name"
                    type="text"
                    placeholder="請輸入名稱"
                    // value={dummy_userData.name}
                  />
                </div>
                <div className="input_div">
                  <label htmlFor="自我介紹">自我介紹</label>
                  <textarea
                    id="名稱"
                    name="自我介紹"
                    placeholder="請輸入自我介紹"
                    // value={dummy_userData.introduction}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
