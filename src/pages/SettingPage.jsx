import { AccountForm } from "components";

import "styles/setting.css";

export default function SettingPage() {
  return (
    <div>
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
