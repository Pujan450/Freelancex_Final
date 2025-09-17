// import React, { useState } from "react";
// import "./Login.scss";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log("Sending payload:", { username, password });

//   console.log("Login button clicked"); // Debug
  
//   try {
//     const res = await newRequest.post("/auth/login", { username, password });
//     console.log("API Success", res.data); // Debug
//     localStorage.setItem("currentUser", JSON.stringify(res.data));
//     navigate("/");
//   } catch (err) {
//     console.log("API Error", err); // Debug
//     setError(err.response?.data || "Unknown error");
//   }
// };


//   return (
//     <div className="login">
//       <form onSubmit={handleSubmit}>
//         <h1>Sign in</h1>
//         <label htmlFor="">Username</label>
//         <input
//           name="username"
//           type="text"
//           placeholder="johndoe"
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <label htmlFor="">Password</label>
//         <input
//           name="password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button> 
//         {error && error}
//       </form>
//     </div>
//   );
// }

// export default Login;







// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Login.scss";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await newRequest.post("/auth/login", { username, password });
      
//       // ✅ Store logged-in user in localStorage
//       localStorage.setItem("currentUser", JSON.stringify(res.data));
      
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div className="login">
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           placeholder="username" 
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input 
//           type="password" 
//           placeholder="password" 
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;




// semi finaldf code 

// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Login.scss";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await newRequest.post("/auth/login", { username, password });

//       // ✅ Store logged-in user
//       localStorage.setItem("currentUser", JSON.stringify(res.data));

//       // ✅ Redirect back to intended page or home
//       const redirectTo = location.state?.from?.pathname || "/";
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div className="login">
//       <form onSubmit={handleSubmit}>
//         <h1>Sign In</h1>
//         <input 
//           type="text" 
//           placeholder="username" 
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input 
//           type="password" 
//           placeholder="password" 
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;



// finaldf code 


// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Login.scss";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await newRequest.post("/auth/login", { username, password });

//       // ✅ Store logged-in user
//       localStorage.setItem("currentUser", JSON.stringify(res.data));

//       // ✅ If user had a pending review, redirect to gig page
//       const pendingReview = localStorage.getItem("pendingReview");
//       if (pendingReview) {
//         const { gigId } = JSON.parse(pendingReview);
//         return navigate(`/gig/${gigId}`, { replace: true });
//       }

//       // ✅ Otherwise, go back to the page they came from or home
//       const redirectTo = location.state?.from?.pathname || "/";
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <div className="login">
//       <form onSubmit={handleSubmit}>
//         <h1>Sign In</h1>
//         <input
//           type="text"
//           placeholder="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

//with username
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Login.scss";
// import { GoogleLogin } from "@react-oauth/google";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await newRequest.post("/auth/login", { username, password });

//       // ✅ Store logged-in user
//       localStorage.setItem("currentUser", JSON.stringify(res.data));

//       // ✅ If user had a pending review, redirect to gig page
//       const pendingReview = localStorage.getItem("pendingReview");
//       if (pendingReview) {
//         const { gigId } = JSON.parse(pendingReview);
//         return navigate(`/gig/${gigId}`, { replace: true });
//       }

//       // ✅ Otherwise, go back to the page they came from or home
//       const redirectTo = location.state?.from?.pathname || "/";
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       console.error(err);
//       alert("Login failed!");
//     }
//   };

//   // New function to handle Google login success
//   const handleGoogleLoginSuccess = async (credentialResponse) => {
//     try {
//       const res = await newRequest.post("/auth/google", {
//         token: credentialResponse.credential,
//       });

//       // ✅ Store logged-in user
//       localStorage.setItem("currentUser", JSON.stringify(res.data));
//       navigate("/");
//     } catch (err) {
//       console.error("Google login failed:", err);
//       alert("Google login failed!");
//     }
//   };

//   return (
//     <div className="login">
//       <form onSubmit={handleSubmit}>
//         <h1>Sign In</h1>
//         <input
//           type="text"
//           placeholder="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>

//       <div className="google-login">
//         <span>OR</span>
//         <GoogleLogin
//           onSuccess={handleGoogleLoginSuccess}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;


//with email

import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.scss";

function Login() {
  const [email, setEmail] = useState(""); // Change variable name
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { email, password }); // Use 'email' here
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      const pendingReview = localStorage.getItem("pendingReview");
      if (pendingReview) {
        const { gigId } = JSON.parse(pendingReview);
        return navigate(`/gig/${gigId}`, { replace: true });
      }
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await newRequest.post("/auth/google", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left-panel">
        
      </div>
      <div className="login-right-panel">
        <div className="form-container">
          <div className="header-text">
            <h2>Welcome back to FreelanceX</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email" // Use type="email" for better validation
                placeholder="alex.jordan@gmail.com"
                value={email} // Use 'email' here
                onChange={(e) => setEmail(e.target.value)} // Use 'setEmail' here
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="" className="forgot-password">Forgot password?</a>
            <div className="remember-me">
              <span>Remember sign in details</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
            <button type="submit" className="login-btn">Log in</button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="google-section">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          <div className="signup-link">
            <span>Don't have an account? <Link to="/register">Sign up</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;