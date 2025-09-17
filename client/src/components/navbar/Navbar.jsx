// import React, { useEffect, useState } from "react";
// import {Link, useLocation} from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";
// import "./Navbar.scss";


// const Navbar = ()=>{
//     const [active,setActive]=useState(false)
//     const [open,setOpen]=useState(false)
//     const {pathname} =useLocation()

//     const isActive = (()=>{
//         window.scrollY> 0 ? setActive(true):setActive(false);
//     })

//     useEffect(()=>{
//         window.addEventListener("scroll",isActive);

//         return ()=>{
//             window.removeEventListener("scroll",isActive)
//         };

//     },[]);

//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     const navigate = useNavigate();

//     const  handleLogout=async()=>{
//         try {
//             await newRequest.post("/auth/logout");
//             localStorage.setItem("currentUser",null);
//             navigate("/");
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     const handleJoinClick = () => {
//         navigate("/register");
//     };
//     return (
//         <div className={active || pathname!=="/" ? "navbar active":"navbar"}>
//             <div className="Container">
//                 <div className="logo">
//                     <Link to ="/" className="link">
//                     <span className="text">fiverr</span>
//                     </Link> 
//                     <span className="dot">.</span>
//                 </div>
//                 <div className="links">
//                     <Link className="link" to="/gigs">All Gigs</Link>
//                     <span>Fiverr Business</span>
//                     <span>English</span>
//                     <Link to="/login" className="link">Sign in</Link>
//                     {!currentUser?.isSeller && <span>Become a Seller</span>}
//                     {!currentUser && <button onClick={handleJoinClick}>Join</button>}
//                     {currentUser && (
//                         <div className="user" onClick={()=>setOpen(!open)}>
//                             <img src={currentUser.img || "/img/noavtar.jpg"} alt="" />
//                             <span>{currentUser?.username}</span>
//                             {open &&<div className="options">
//                                 {
//                                     currentUser?.isSeller&&(
//                                         <>
//                                         <Link className="link" to="/mygigs">Gigs</Link>
//                                         <Link className="link" to="/add">Add New Gig</Link>
//                                         </>
//                                     )
//                                 }
//                                 <Link className="link" to="/orders">Orders</Link>
//                                 <Link className="link" to="/messages">Messages</Link>
//                                 <Link className="link" onClick={handleLogout}>Logout</Link>
//                             </div>}
//                         </div>
//                     )}

//                 </div>
//             </div>
            
//             {(active || pathname!=="/") && (
//                 <><hr/>
//             <div className="menu">
//                 <Link className="link menuLink" to="/">Graphics & Design</Link>
//                 <Link className="link" to="/">Video & Animation</Link>
//                 <Link className="link" to="/">Writing & Translation</Link>
//                 <Link className="link" to="/">AI Services</Link>
//                 <Link className="link" to="/">Digital Marketing</Link>
//                 <Link className="link" to="/">Music & Audio</Link>
//                 <Link className="link" to="/">Programming & Tech</Link>
//                 <Link className="link" to="/">Business</Link>
//                 <Link className="link" to="/">Lifestyle</Link>
//             </div> </>)}
//         </div>
//     )
// }

// export default Navbar





import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Scroll effect
  const handleScroll = useCallback(() => {
    setActive(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleJoinClick = () => {
    navigate("/register");
  };

  const handleBecomeSeller = async () => {
    try {
      await newRequest.put("/users/become-seller");
      const updatedUser = { ...currentUser, isSeller: true };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (err) {
      console.error("Error becoming seller:", err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="Container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>

        <div className="links">
          <Link className="link" to="/gigs">All Gigs</Link>
          <span>Fiverr Business</span>
          <span>English</span>

          {!currentUser && (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <button onClick={handleJoinClick}>Join</button>
            </>
          )}

          {currentUser && !currentUser.isSeller && (
           
            <Link className="link" to="/become-seller">Become a Seller</Link>
          )}

          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavtar.jpg"} alt="user avatar" />
              <span>{currentUser.username}</span>

              {open && (
                <div className="options">
                  {currentUser.isSeller ? (
                    <>
                      <Link className="link" to="/mygigs">Gigs</Link>
                      <Link className="link" to="/add">Add New Gig</Link>
                      <Link className="link" to="/orders">Orders</Link>
                      <Link className="link" to="/messages">Messages</Link>
                      <span className="link" onClick={handleLogout}>Logout</span>
                    </>
                  ) : (
                    <>
                      <Link className="link" to="/orders">Orders</Link>
                      <Link className="link" to="/messages">Messages</Link>
                      <span className="link" onClick={handleLogout}>Logout</span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">Graphics & Design</Link>
            <Link className="link" to="/">Video & Animation</Link>
            <Link className="link" to="/">Writing & Translation</Link>
            <Link className="link" to="/">AI Services</Link>
            <Link className="link" to="/">Digital Marketing</Link>
            <Link className="link" to="/">Music & Audio</Link>
            <Link className="link" to="/">Programming & Tech</Link>
            <Link className="link" to="/">Business</Link>
            <Link className="link" to="/">Lifestyle</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;