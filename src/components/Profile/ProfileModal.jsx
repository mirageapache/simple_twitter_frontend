import { useEffect, useState } from "react";
import { getUserDataAPI, editUserDataAPI } from 'api/userProfile';

// style
import "styles/profileModal.css";

import { ReactComponent as IconClose } from "assets/icons/close.svg";
import { ReactComponent as IconAddPhoto } from "assets/icons/addphoto.svg";

// data
// import dummyAvatar from "assets/images/dummy_images/userCard/avatar.jpeg";
// import dummyCover from "assets/images/dummy_images/dummy_cover.jpg";
import { useAuth } from "context/AuthContext";


// const dummy_cover = dummyCover;
// const dummy_avatar = dummyAvatar;

export default function ReplyModal({ onModalToggle }) {
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [avatar, setAvatar] = useState('');
  const [cover, setCover] = useState('');
  const { currentMember } = useAuth();

  // 取得使用者資料
  useEffect(() => {
    async function getUserData(){
      const result = await getUserDataAPI(currentMember.id);
      if(result.status === 200){
        setName(result.data.name);
        setIntroduction(result.data.introduction);
        setAvatar(result.data.avatar);
        setCover(result.data.cover);
      }
    }
    getUserData();
  },[currentMember])

  async function editUserData(){
    // 資料驗證
    if(name.length === 0){
      alert('名稱不可空白！');
      return;
    }
    if(name.length > 50){
      alert('名稱字數不可超過50字！');
      return;
    }
    if(introduction.length === 0){
      alert('自我介紹不可空白！');
      return;
    }
    if(introduction.length > 50){
      alert('自我介紹字數不可超過50字！');
      return;
    }

    const data = {name, introduction }
    const result = await editUserDataAPI(currentMember.id, data)
    if(result.status === 200){
      alert('資料已更新！');
      onModalToggle();
    }

  }

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

          <button type="button" className="btn-save" onClick={() => {editUserData()}}>
            儲存
          </button>
        </div>
        <div className="modal_body">
          <div className="modal-cover-image">
            <img
              src={cover}
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
          <div className="modal-avatar-wrapper">
            <img
              src={avatar}
              alt="user avatar"
              className=" modal-avatar-img avatar-container"
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
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div className="input_div">
                  <label htmlFor="自我介紹">自我介紹</label>
                  <textarea
                    id="名稱"
                    name="自我介紹"
                    placeholder="請輸入自我介紹"
                    value={introduction}
                    onChange={(e)=>{setIntroduction(e.target.value)}}
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
