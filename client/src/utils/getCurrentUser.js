// const getCurrentUser = () => {
//   return JSON.parse(localStorage.getItem("currentUser"));
// };

// export default getCurrentUser

// utils/getCurrentUser.js




export default function getCurrentUser() {
  try {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Error parsing currentUser:", err);
    return null;
  }
}
