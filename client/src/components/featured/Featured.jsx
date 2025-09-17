// import React, { useRef, useState, useEffect } from "react";
// import "./Featured.scss";
// import { useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";

// const Featured = () => {
//   const navigate = useNavigate();
//   const inputRef = useRef();
//   const [suggestions, setSuggestions] = useState([]);

//   // Debounce logic for fetching suggestions
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       const query = inputRef.current.value;
//       if (query.length > 2) {
//         try {
//           const res = await newRequest.get(`/gigs/suggestions?q=${query}`);
//           setSuggestions(res.data);
//         } catch (err) {
//           console.error("Failed to fetch suggestions:", err);
//         }
//       } else {
//         setSuggestions([]);
//       }
//     };
//     const timer = setTimeout(fetchSuggestions, 300);
//     return () => clearTimeout(timer);
//   }, [inputRef.current?.value]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const query = inputRef.current.value;
//     if (query) {
//       navigate(`/gigs?search=${query}`);
//     }
//   };

//   const handleSuggestionClick = (title) => {
//     navigate(`/gigs?search=${title}`);
//     setSuggestions([]); // Clear suggestions after clicking
//   };

//   return (
//     <div className="featured">
//       <div className="container">
//         <div className="left">
//           <h1>
//             Find the perfect <i>freelance</i> services for your business
//           </h1>
//           <form className="search" onSubmit={handleSearch}>
//             <div className="searchInput">
//               <img src="./img/search.png" alt="Search icon" />
//               <input 
//                 type="text" 
//                 placeholder='Try "building an app"' 
//                 ref={inputRef} 
//                 onChange={() => setSuggestions([])} 
//               />
//               {suggestions.length > 0 && (
//                 <ul className="suggestions-dropdown">
//                   {suggestions.slice(0, 5).map((s, index) => (
//                     <li key={index} onClick={() => handleSuggestionClick(s.title)}>
//                       <div className="suggestion-item">
//                         <div className="suggestion-header">
//                           <span>{s.title}</span>
//                           <span className="price">${s.price}</span>
//                         </div>
//                         <span className="seller-info">by {s.userId.username}</span>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//             <button type="submit">Search</button>
//           </form>
//           <div className="popular">
//             <span>Popular:</span>
//             <button onClick={() => navigate("/gigs?cat=web-design")}>Web Design</button>
//             <button onClick={() => navigate("/gigs?cat=wordpress")}>WordPress</button>
//             <button onClick={() => navigate("/gigs?cat=logo-design")}>Logo Design</button>
//             <button onClick={() => navigate("/gigs?cat=ai-services")}>AI Services</button>
//           </div>
//         </div>
//         <div className="right">
//           <img src="./img/man.png" alt="Man using a computer" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Featured;











import React, { useRef, useState, useEffect } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Featured = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        try {
          const res = await newRequest.get(`/gigs/suggestions?q=${query}`);
          setSuggestions(res.data);
        } catch (err) {
          console.error("Failed to fetch suggestions:", err);
        }
      } else {
        setSuggestions([]);
      }
    };
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/gigs?search=${query}`);
    }
  };

  const handleSuggestionClick = (gigId) => {
    navigate(`/gig/${gigId}`);
    setSuggestions([]);
  };

  const handleViewMore = () => {
    navigate(`/gigs?search=${query}`);
    setSuggestions([]);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <i>freelance</i> services for your business
          </h1>
          <form className="search" onSubmit={handleSearch}>
            <div className="searchInput">
              <img src="./img/search.png" alt="Search icon" />
              <input
                type="text"
                placeholder='Try "building an app"'
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                  {suggestions.slice(0, 5).map((s, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(s._id)}>
                      <div className="suggestion-item">
                        <div className="suggestion-header">
                          <span className="title">{s.title}</span>
                          <span className="price">${s.price}</span>
                        </div>
                        <div className="suggestion-meta">
                          ⭐ {s.rating.toFixed(1)} | by{" "}
                          <strong>{s.userId.username}</strong>
                        </div>
                      </div>
                    </li>
                  ))}
                  {suggestions.length > 5 && (
                    <li className="view-more" onClick={handleViewMore}>
                      View more results...
                    </li>
                  )}
                </ul>
              )}
            </div>
            <button type="submit">Search</button>
          </form>
          <div className="popular">
            <span>Popular:</span>
            <button onClick={() => navigate("/gigs?cat=web-design")}>
              Web Design
            </button>
            <button onClick={() => navigate("/gigs?cat=wordpress")}>
              WordPress
            </button>
            <button onClick={() => navigate("/gigs?cat=logo-design")}>
              Logo Design
            </button>
            <button onClick={() => navigate("/gigs?cat=ai-services")}>
              AI Services
            </button>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="Man using a computer" />
        </div>
      </div>
    </div>
  );
};

export default Featured;
