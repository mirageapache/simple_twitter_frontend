import { Navbar, Recommend, MainContent, ReplyContent } from "components";
import FollowPage from "pages/profile/FollowPage.jsx";

import "styles/main.css";

export default function MainPage({ path }) {
  let contentBoard;
  if (path === "main") {
    // 主頁面內容
    contentBoard = <MainContent />;
  } else if (path === "reply") {
    // 回覆頁面內容;
    contentBoard = <ReplyContent />;
  } else if (path === "follow") {
    // 跟隨頁面
    contentBoard = <FollowPage />;
  }
  return (
    <div className="main_page">
      {/* 導覽列 */}
      <section className="nav_section">
        <Navbar />
      </section>

      {/* 內容區塊 */}
      <section className="content_section">{contentBoard}</section>

      {/* 推薦跟隨 */}
      <section className="recommend_section">
        <Recommend />
      </section>
    </div>
  );
}
