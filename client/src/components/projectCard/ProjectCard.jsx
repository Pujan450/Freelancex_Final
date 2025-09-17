// // src/components/projectCard/ProjectCard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import "./ProjectCard.scss";

// function ProjectCard({ card }) {
//   // Convert category to a URL-friendly slug for the gigs page
//   const categorySlug = card.cat.toLowerCase().replace(/\s/g, '-');

//   return (
//     <div className="projectCard">
//       {/* Link the image to the filtered gigs page */}
//       <Link to={`/gigs?cat=${categorySlug}`}> 
//         <img src={card.img} alt="" />
//       </Link>
//       <div className="info">
//         {/* Link the profile picture to the new user profile page */}
//         <Link to={`/user/${card.username}`}> 
//           <img src={card.pp} alt="" />
//         </Link>
//         <div className="texts">
//           <h2>
//             {/* Link the category text */}
//             <Link to={`/gigs?cat=${categorySlug}`}>{card.cat}</Link>
//           </h2>
//           <span>
//             {/* Link the username */}
//             <Link to={`/user/${card.username}`}>{card.username}</Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectCard;










// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import "./ProjectCard.scss";

// // The 'card' prop now expects a gig object from the API
// function ProjectCard({ card }) {
//   const { currentUser } = useContext(AuthContext);
  
//   // Assuming 'card' is a gig object from the backend
//   // Gigs usually have a 'cover' image and a 'userId'
//   const gigId = card._id; // Use gig ID for linking to single gig page
//   const username = card.username; // Assuming your gig object has a username
//   const category = card.cat;
  
//   // Use the gig's cover image. If not available, use a placeholder.
//   const imageUrl = card.cover || "/img/noimage.jpg"; 
  
//   // Use the gig's owner's profile picture. You might need to fetch this
//   // or ensure your gig object includes the owner's pp directly.
//   // For now, let's assume gig.owner.pp exists or use a default.
//   // If your gig object ONLY has userId, you might need another query to get the owner's pp.
//   // For simplicity, let's assume card.ownerId exists and you'll fetch pp in Profile link.
  
//   const categorySlug = category?.toLowerCase().replace(/\s/g, '-');

//   return (
//     <div className="projectCard">
//       {/* Link to the individual gig details page */}
//       <Link to={`/gig/${gigId}`}> 
//         <img src={imageUrl} alt={category} />
//       </Link>
//       <div className="info">
//         {/* Link to the gig owner's profile */}
//         {/* You need to ensure 'username' is available in your gig object */}
//         {username && (
//           <Link to={`/user/${username}`}> 
//             {/* If your gig object does not directly contain 'pp', you might need to adjust this.
//                 For now, using a placeholder. */}
//             <img src={card.pp || "/img/noavatar.jpg"} alt={username} />
//           </Link>
//         )}
//         <div className="texts">
//           <h2>
//             {/* Link to the gigs filtered by category */}
//             {categorySlug && <Link to={`/gigs?cat=${categorySlug}`}>{category}</Link>}
//           </h2>
//           <span>
//             {/* Display "You" if it's the current user's gig, otherwise display the username */}
//             {currentUser && currentUser.username === username 
//               ? "You" 
//               : username}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProjectCard;





import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.scss";

// The 'card' prop is a single gig object from your API
function ProjectCard({ card }) {
  return (
    <Link to={`/gig/${card._id}`} className="projectCardLink">
      <div className="projectCard">
        {/* 1. Gig Coverpage */}
        <img 
          src={card.cover || "/img/noimage.jpg"} 
          alt={card.title} 
          className="gigCover"
        />

        <div className="info">
          {/* 2. Seller Profile Photo & Username */}
          {/* ✅ Add the Link here to make the user info clickable */}
          <Link to={`/user/${card.userId?.username}`} className="user-link">
            <div className="user">
              <img 
                src={card.userId?.img || "/img/noavtar.jpg"} 
                alt={card.userId?.username} 
                className="userProfilePic"
              />
              <span>{card.userId?.username}</span>
            </div>
          </Link>
          
          {/* 3. Title of Gig */}
          <p>{card.title}</p>
          
          {/* 4. Star of Review */}
          <div className="star">
            <img src="./img/star.png" alt="star" />
            <span>
              {!isNaN(card.totalStars / card.starNumber) &&
                Math.round(card.totalStars / card.starNumber)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;