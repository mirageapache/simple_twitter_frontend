// style
import 'styles/recommend.css';

import { recommend_data } from 'data/dummy_data.js';

import { ReactComponent as IconAvatar } from 'assets/icons/avatar.svg';



export default function Recommend(){

  const recommend_list = recommend_data.map((item,index) => {
    return <RecommendItem key={index} account={item.account} name={item.name} />
  })

  return(
    <div className='recommend'>
      <h4 className='title'>推薦跟隨</h4>
      {recommend_list}
    </div>
  )
}


function RecommendItem({account, name}){
  return(
    <div className='recommend_item'>
      {/* 大頭貼 */}
      <div className='item_avatar'>
        <IconAvatar />
      </div>

      {/* 名稱、帳號 */}
      <div className='item_text'>
        <p className='name'>{name}</p>
        <p className='account'>@{account}</p>
      </div>

      {/* 跟隨按鈕 */}
      <div className='item_btn'>
        <button className='follow_btn'>正在跟隨</button>
      </div>
    </div>
  )
}