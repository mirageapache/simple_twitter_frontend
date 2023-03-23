import { Navbar, AccountForm } from "components";

import "styles/setting.css";

export default function SettingPage() {
  return (
    <div className="setting_page">
      {/* 導覽列 */}
      <section className="nav_section">
        <Navbar />
      </section>

      {/* 設定表單 */}
      <section className="setting_section">
        <div className="banner">
          <p>帳戶設定</p>
        </div>
        <div className="setting_form">
          <AccountForm page="setting" />
        </div>
      </section>
      {/* <section className='empty_section'></section> */}
    </div>
  );
}
