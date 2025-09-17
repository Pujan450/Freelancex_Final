// import React from "react";
// import "./GigCard.scss";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";

// const GigCard = ({ item }) => {
//   const { isLoading, error, data } = useQuery({
//     queryKey: [item.userId],
//     queryFn: () =>
//       newRequest.get(`/users/${item.userId}`).then((res) => {
//         return res.data;
//       }),
//   });
//   return (
//     <Link to={`/gig/${item._id}`} className="link">
//       <div className="gigCard">
//         <img src={item.cover} alt="" />
//         <div className="info">
//           {isLoading ? (
//             "loading"
//           ) : error ? (
//             "Something went wrong!"
//           ) : (
//             <div className="user">
//               <img src={data.img || "/img/noavtar.jpg"} alt="" />
//               <span>{data.username}</span>
//             </div>
//           )}
//           <p>{item.title}</p>
//           <div className="star">
//             <img src="./img/star.png" alt="" />
//             <span>
//               {!isNaN(item.totalStars / item.starNumber) &&
//                 Math.round(item.totalStars / item.starNumber)}
//             </span>
//           </div>
//         </div>
//         <hr />
//         <div className="detail">
//           <img src="./img/heart.png" alt="" />
//           <div className="price">
//             <span>STARTING AT</span>
//             <h2>$ {item.price}</h2>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default GigCard;


// import React from "react";
// import "./GigCard.scss";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";

// const GigCard = ({ item }) => {
//   // Fetch only public seller info (no auth required)
//   const { isLoading, error, data } = useQuery({
//     queryKey: ["publicUser", item.userId],
//     queryFn: () =>
//       newRequest.get(`/users/${item.userId._id}/public`).then((res) => res.data),
//   });

//   return (
//     <Link to={`/gig/${item._id}`} className="link">
//       <div className="gigCard">
//         <img src={item.cover} alt={item.title} />
//         <div className="info">
//           {isLoading ? (
//             "loading..."
//           ) : error ? (
//             "Something went wrong!"
//           ) : (
//             <div className="user">
//               <img src={data?.img || "/img/noavtar.jpg"} alt={data?.username} />
//               <span>{data?.username}</span>
//             </div>
//           )}
//           <p>{item.title}</p>
//           <div className="star">
//             <img src="/img/star.png" alt="star" />
//             <span>
//               {!isNaN(item.totalStars / item.starNumber) &&
//                 Math.round(item.totalStars / item.starNumber)}
//             </span>
//           </div>
//         </div>
//         <hr />
//         <div className="detail">
//           <img src="/img/heart.png" alt="favorite" />
//           <div className="price">
//             <span>STARTING AT</span>
//             <h2>$ {item.price}</h2>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default GigCard;

import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";

const GigCard = ({ item }) => {
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt={item.title} />
        <div className="info">
          {/* ✅ Wrap the user info in a Link component */}
          <Link to={`/user/${item.userId?.username}`} className="user-link">
            <div className="user">
              <img src={item.userId?.img || "/img/noavtar.jpg"} alt={item.userId?.username} />
              <span>{item.userId?.username}</span>
            </div>
          </Link>
          <p>{item.title}</p>
          <div className="star">
            <img src="/img/star.png" alt="star" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="/img/heart.png" alt="favorite" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;