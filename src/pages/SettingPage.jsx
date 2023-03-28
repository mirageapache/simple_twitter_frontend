import { AccountForm } from "components";
import { useAuth } from "context/AuthContext";
import { useEffect, useState } from "react";
import { getAccountAPI } from 'api/main';

import "styles/setting.css";

export default function SettingPage() {
  const { currentMember } = useAuth();
  const [userData, setUserData] = useState();

  // 取得使用者帳號資料
  useEffect(() => {
    async function getAccount(){
      const result = await getAccountAPI(currentMember.id)
      if(result.status === 200){
        setUserData(result.data.data.user);
      }
    }
    getAccount()
  },[currentMember.id])


  return (
    <div>
      {/* 設定表單 */}
      <section className="setting_section">
        <div className="banner">
          <p>帳戶設定</p>
        </div>
        <div className="setting_form">
          <AccountForm userData={userData} current_page='setting' />
        </div>
      </section>
    </div>
  );
}
