// // src/pages/profile/Profile.jsx
// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import newRequest from '../../utils/newRequest'; // Assuming you have a newRequest utility for API calls
// import GigCard from '../../components/gigCard/GigCard';
// import './Profile.scss'; // You'll need to create this CSS file for styling

// const Profile = () => {
//   const { username } = useParams();

//   // Fetch the user's data
//   const { isLoading: userLoading, error: userError, data: userData } = useQuery({
//     queryKey: ['user', username],
//     queryFn: () => newRequest.get(`/users/${username}`).then((res) => res.data),
//   });

//   // Fetch all gigs by this user (or you can include this data in the user query)
//   const { isLoading: gigsLoading, error: gigsError, data: gigsData } = useQuery({
//     queryKey: ['gigs', username],
//     queryFn: () => newRequest.get(`/gigs?userId=${userData._id}`).then((res) => res.data),
//     enabled: !!userData, // Only run this query if userData is available
//   });

//   if (userLoading) return "Loading user data...";
//   if (userError) return "Something went wrong fetching user data!";
//   if (!userData) return "User not found!";

//   return (
//      <div className="profile-page">
//       <div className="container">
//         <div className="user-info">
//           <img src={userData.img || "/img/noavatar.jpg"} alt={userData.username} className="profile-pic" />
//           <h1>{userData.username}</h1>
//           {/* ✅ Check if the user is a seller and display a badge */}
//           {userData.isSeller && <span className="seller-badge">Seller</span>}
//           {/* OR simply render different text */}
//           {/* {userData.isSeller ? <span className="seller-text">I am a Seller</span> : null} */}
          
//           <p>{userData.desc || "No bio provided."}</p>
//           <div className="rating">
//             <span className="stars">
//               ⭐ {userData.totalStars / userData.starNumber || 0}
//             </span>
//             <span>({userData.starNumber || 0} reviews)</span>
//           </div>
//         </div>

//         <div className="user-gigs">
//           <h2>Gigs by {userData.username}</h2>
//           {gigsLoading ? (
//             "Loading gigs..."
//           ) : gigsError ? (
//             "Something went wrong fetching gigs!"
//           ) : gigsData && gigsData.length > 0 ? (
//             <div className="gig-list">
//               {gigsData.map((gig) => (
//                 <GigCard key={gig._id} item={gig} />
//               ))}
//             </div>
//           ) : (
//             <p>This user has no gigs yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// src/pages/profile/Profile.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest'; 
import GigCard from '../../components/gigCard/GigCard';
import './Profile.scss'; 

const Profile = () => {
  const { username } = useParams();

  const { isLoading: userLoading, error: userError, data: userData } = useQuery({
    queryKey: ['user', username],
    queryFn: () => newRequest.get(`/users/${username}`).then((res) => res.data),
  });

  const { isLoading: gigsLoading, error: gigsError, data: gigsData } = useQuery({
    queryKey: ['gigs', username],
    queryFn: () => newRequest.get(`/gigs?userId=${userData?._id}`).then((res) => res.data),
    enabled: !!userData,
  });

  if (userLoading) return "Loading user data...";
  if (userError) return "Something went wrong fetching user data!";
  if (!userData) return "User not found!";

  return (
    <div className="profile-page">
      <div className="container">
        <div className="user-info">
          <img src={userData.img || "/img/noavtar.jpg"} alt={userData.username} className="profile-pic" />
          <h1>{userData.username}</h1>
          {userData.isSeller && <span className="seller-badge">Seller</span>}
          <p>{userData.desc || "No bio provided."}</p>
          
          {/* ✅ Conditionally render seller-specific info */}
          {userData.isSeller && (
            <div className="seller-details">
              <h3>About the Seller</h3>
              <p>{userData.description}</p>
              {userData.skills && userData.skills.length > 0 && (
                <>
                  <h4>Skills:</h4>
                  <ul>
                    {userData.skills.map(skill => <li key={skill}>{skill}</li>)}
                  </ul>
                </>
              )}
              <p>Completed Orders: {userData.completedOrders}</p>
            </div>
          )}
          
          <div className="rating">
            <span className="stars">
              ⭐ {userData.rating || 0}
            </span>
            <span>({userData.completedOrders || 0} reviews)</span>
          </div>
          
        </div>

        <div className="user-gigs">
          <h2>Gigs by {userData.username}</h2>
          {gigsLoading ? (
            "Loading gigs..."
          ) : gigsError ? (
            "Something went wrong fetching gigs!"
          ) : gigsData?.length > 0 ? (
            <div className="gig-list">
              {gigsData.map((gig) => (
                <GigCard key={gig._id} item={gig} />
              ))}
            </div>
          ) : (
            <p>This user has no gigs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;