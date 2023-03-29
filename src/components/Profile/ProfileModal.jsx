import { useEffect, useState } from "react";
import { getUserDataAPI, editUserDataAPI } from 'api/userProfile';
import { useAuth } from "context/AuthContext";

// style
import "styles/profileModal.css";
// svg
import { ReactComponent as IconClose } from "assets/icons/close.svg";
import { ReactComponent as IconAddPhoto } from "assets/icons/addphoto.svg";

export default function ReplyModal({ onModalToggle }) {
  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarData, setAvatarData] = useState(null);
  const [cover, setCover] = useState(null);
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

  function handleAvatar(event){
    if(event.target.files[0] !== undefined){
      setAvatar(URL.createObjectURL(event.target.files[0]));
      setAvatarData(event.target.files[0]);
    }
    // const formData = new FormData();
    // formData.append("avatar", event.target.files[0])
    // console.log(formData);
  }

  // 編輯 User Data
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

    // const avatarData = new FormData();
    // avatarData.append("avatar", avatar)
    // console.log(avatarData)
    const data = {name, introduction, avatar:avatarData }
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
              <div className="cover-edit-setting">
                <label className="svg-label" htmlFor="upload_cover">
                  <IconAddPhoto  className="add-cover setting-icon-svg add-photo-icon" />
                </label>
                <input className="upload-input" type="file" name="" id="upload_cover"/>
                <label className="svg-label">
                  <IconClose className="delete-cover setting-icon-svg" />
                </label>
              </div>
            </span>
          </div>
          <div className="modal-avatar-wrapper">
            {/* ===== */}
            
            <img
              src={avatar}
              alt="user avatar"
              className=" modal-avatar-img avatar-container"
            />


            <span className="avatar-gray-panel">
              <label htmlFor="upload_avatar" className="avatar-edit-setting">
                <IconAddPhoto className="setting-icon-svg add-photo-icon" />
              </label>
              <input 
                className="upload-input" 
                type="file" 
                name="avatar" 
                id="upload_avatar" 
                onChange={handleAvatar}
              />
            </span>
            
            {/* ===== */}

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
