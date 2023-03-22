import {Navbar, Recommend, Content} from 'components';

import 'styles/main.css'

export default function MainPage(){

  return(
    <div className='main_page'>

      {/* 導覽列 */}
      <section className='nav_section'>
        <Navbar />

      </section>

      {/* 內容區塊 */}
      <section className='content_section'>
        
        <Content />
      </section>

      {/* 推薦跟隨 */}
      <section className='recommend_section'>
        <Recommend />
      </section>


    </div>
  )
}