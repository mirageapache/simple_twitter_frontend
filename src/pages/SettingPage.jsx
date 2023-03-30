import { useEffect, useState } from "react";
import { getAccountAPI } from "api/main";
import { useAuth } from "context/AuthContext";
import { AccountForm } from "components";
import LoadingMes from "components/LoadingMes";
import { useNoti } from "context/NotiContext";

import "styles/setting.css";

export default function SettingPage() {
  const { isAuthenticated, logout, currentMember } = useAuth();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const { setActiveItem } = useNoti();

  setActiveItem('setting');

  // 取得使用者帳號資料
  useEffect(() => {
    setLoading(false);
    if (!isAuthenticated) {
      return logout();
    } else {
      const getAccount = async () => {
        try {
          const result = await getAccountAPI(currentMember.id);
          if (result.status === 200) {
            setUserData(result.data.data.user);
            setLoading(true);
          }
        } catch (err) {
          console.log(err);
        }
      };
      getAccount();
    }
  }, [isAuthenticated, logout, currentMember]);

  return (
    <div>
      {/* 設定表單 */}
      {loading ? (
        <section className="setting_section">
          <div className="banner">
            <p>帳戶設定</p>
          </div>
          <div className="setting_form">
            <AccountForm userData={userData} current_page="setting" />
          </div>
        </section>
      ) : (
        <LoadingMes />
      )}
    </div>
  );
}
