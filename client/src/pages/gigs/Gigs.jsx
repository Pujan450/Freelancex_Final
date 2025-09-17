// import React, { useEffect, useRef, useState } from "react";
// import "./Gigs.scss";
// import GigCard from "../../components/gigCard/GigCard";
// import { useQuery } from "@tanstack/react-query";
// import newRequest from "../../utils/newRequest";
// import { useLocation } from "react-router-dom";

// function Gigs() {
//   const [sort, setSort] = useState("sales");
//   const [open, setOpen] = useState(false);
//   const minRef = useRef();
//   const maxRef = useRef();

//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const category = queryParams.get("cat"); // 👈 extract ?cat=design

//   const { isLoading, error, data, refetch } = useQuery({
//     queryKey: ["gigs", category, sort], // depend on cat + sort
//     queryFn: () =>
//       newRequest
//         .get(
//           `/gigs?cat=${category || ""}&min=${minRef.current?.value || 0}&max=${
//             maxRef.current?.value || 10000
//           }&sort=${sort}`
//         )
//         .then((res) => res.data),
//   });

//   const reSort = (type) => {
//     setSort(type);
//     setOpen(false);
//   };

//   useEffect(() => {
//     if (error) {
//       console.error("Error fetching gigs:", error);
//     }
//     if (data) {
//       console.log("Fetched gigs:", data);
//     }
//   }, [error, data]);

//   const apply = () => {
//     refetch();
//   };

//   return (
//     <div className="gigs">
//       <div className="container">
//         <span className="breadcrumbs">
//           Liverr &gt; {category ? category : "All Categories"} &gt;
//         </span>
//         <h1>{category ? category : "All Gigs"}</h1>
//         <p>
//           Explore the boundaries of art and technology with Liverr's AI artists
//         </p>
//         <div className="menu">
//           <div className="left">
//             <span>Budget</span>
//             <input ref={minRef} type="number" placeholder="min" />
//             <input ref={maxRef} type="number" placeholder="max" />
//             <button onClick={apply}>Apply</button>
//           </div>
//           <div className="right">
//             <span className="sortBy">Sort by</span>
//             <span className="sortType">
//               {sort === "sales" ? "Best Selling" : "Newest"}
//             </span>
//             <img
//               src="./img/down.png"
//               alt=""
//               onClick={() => setOpen(!open)}
//             />
//             {open && (
//               <div className="rightMenu">
//                 {sort === "sales" ? (
//                   <span onClick={() => reSort("createdAt")}>Newest</span>
//                 ) : (
//                   <span onClick={() => reSort("sales")}>Best Selling</span>
//                 )}
//                 <span onClick={() => reSort("sales")}>Popular</span>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="cards">
//           {isLoading ? (
//             "Loading..."
//           ) : error ? (
//             "Something went wrong!"
//           ) : data && data.length > 0 ? (
//             data.map((gig) => <GigCard key={gig._id} item={gig} />)
//           ) : (
//             <p>No gigs available yet. Create your first gig 🎉</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Gigs;


import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const category = queryParams.get("cat");
  const searchTerm = queryParams.get("search");

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", category, searchTerm, sort],
    queryFn: () =>
      newRequest
        .get(
          `/gigs?cat=${category || ""}&search=${searchTerm || ""}&min=${
            minRef.current?.value || ""
          }&max=${maxRef.current?.value || ""}&sort=${sort}`
        )
        .then((res) => res.data),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [category, searchTerm, sort, refetch]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
          Liverr &gt; {category || "All Gigs"} &gt;
        </span>
        <h1>{searchTerm || category || "All Gigs"}</h1>
        <p>
          {searchTerm
            ? `Explore gigs for "${searchTerm}"`
            : category
            ? `Explore the boundaries of ${category}`
            : "Explore the endless possibilities of freelance services."}
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType" onClick={() => setOpen(!open)}>
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong!"
          ) : data && data.length > 0 ? (
            data.map((gig) => <GigCard key={gig._id} item={gig} />)
          ) : (
            <p>No gigs available yet. </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gigs;