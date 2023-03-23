import {Navbar, Recommend, MainContent, ReplyContent} from 'components';

import 'styles/main.css'

export default function MainPage({path}){


  return(
    <div className='main_page'>
      {/* 導覽列 */}
      <section className='nav_section'>
        <Navbar />

      </section>

      {/* 內容區塊 */}
      <section className='content_section'>
        {/* <MainContent />  */}
        {/* <ReplyContent /> */}

        {path === 'main'?
          <MainContent /> // 主頁面內容 
        :
          <ReplyContent /> // 回覆頁面內容
        }
      </section>

      {/* 推薦跟隨 */}
      <section className='recommend_section'>
        <Recommend />
      </section>
    </div>
  )
}