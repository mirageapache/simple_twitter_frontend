import { useState, useEffect } from "react";

// api
import {
  getRecommendAPI,
  createFollowShipAPI,
  unFollowAPI,
} from "api/userfollow";

// style
import "styles/recommend.css";

export default function Recommend() {
  //   const [recommendData, setRecommendData] = useState([]);
  //   const [loading, setLoading] = useState(false);
  //   // 取得推薦
  //   useEffect(() => {
  //     const getRecommend = async () => {
  //       try {
  //         let rawRecommendData = await getRecommendAPI();
  //         setRecommendData(rawRecommendData);
  //         setLoading(true);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getRecommend();
  //   }, [loading]);

  //   // 跟隨、取消
  //   function handleFollowShip(followShipId, followedState) {
  //     console.log("handleFollowShip", followShipId, followedState);
  //     async function toggleFollowShip(followShipId, followedState) {
  //       try {
  //         const result = followedState
  //           ? await unFollowAPI(followShipId)
  //           : await createFollowShipAPI(followShipId);
  //         if (result.status === "success") {
  //           // 需要重新取得遠端資料：為了排序
  //           setLoading(false);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     toggleFollowShip(followShipId, followedState);
  //   }

  function handelTest(num) {
    async function getTest(num) {
      console.log("handelTestinR", num);
      try {
        await console.log("handelTestinR", num);
      } catch (err) {
        console.log(err);
      }
    }
    getTest(num);
  }

  return (
    <div className="recommend">
      <button
        type="button"
        className="follow-item-button-active"
        onClick={() => handelTest(3)}
      >
        戳
      </button>
      {/* <h4 className="title">推薦跟隨</h4>
      {loading ? (
        <RecommendList
          recommendData={recommendData}
          handleFollowShip={handleFollowShip}
        />
      ) : (
        ""
      )} */}
    </div>
  );
}

// function RecommendList({ recommendData, handleFollowShip }) {
//   return recommendData.map((data) => {
//     if (data?.is_followed) {
//       return (
//         <RecommendItem
//           key={data?.id}
//           btnClass="recommend_btn_active"
//           data={data}
//           handleFollowShip={handleFollowShip}
//         />
//       );
//     } else {
//       return (
//         <RecommendItem
//           key={data?.id}
//           btnClass="recommend_btn"
//           data={data}
//           handleFollowShip={handleFollowShip}
//         />
//       );
//     }
//   });
// }

// function RecommendItem({ data, btnClass, handleFollowShip }) {
//   return (
//     <div className="recommend_item">
//       <div className="recommend_item_info">
//         <img
//           src={data?.avatar}
//           alt="user avatar"
//           className="recommend_item_avatar"
//         />
//         <div className="item_text">
//           <p className="name">{data?.name}</p>
//           <p className="account">@{data?.account}</p>
//         </div>
//       </div>
//       <button
//         type="button"
//         className={btnClass}
//         onClick={() => {
//           handleFollowShip(data.id, data?.is_followed);
//         }}
//       >
//         {data.is_followed ? "正在跟隨" : "跟隨"}
//       </button>
//     </div>
//   );
// }
