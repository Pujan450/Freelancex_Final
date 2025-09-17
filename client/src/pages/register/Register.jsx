//with username
// import React, { useState } from "react";
// import upload from "../../utils/upload";
// import "./Register.scss";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [file, setFile] = useState(null);
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     img: "",
//     country: "",
//     isSeller: false,
//     desc: "",
//   });

 

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUser((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };

//   const handleSeller = (e) => {
//     setUser((prev) => {
//       return { ...prev, isSeller: e.target.checked };
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = await upload(file);
//     try {
//       await newRequest.post("/auth/register", {
//         ...user,
//         img: url,
//       });
//       navigate("/")
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="register">
//       <form onSubmit={handleSubmit}>
//         <div className="left">
//           <h1>Create a new account</h1>
//           <label htmlFor="">Username</label>
//           <input
//             name="username"
//             type="text"
//             placeholder="johndoe"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Email</label>
//           <input
//             name="email"
//             type="email"
//             placeholder="email"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Password</label>
//           <input name="password" type="password" onChange={handleChange} />
//           <label htmlFor="">Profile Picture</label>
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//           <label htmlFor="">Country</label>
//           <input
//             name="country"
//             type="text"
//             placeholder="Usa"
//             onChange={handleChange}
//           />
//           <button type="submit">Register</button>
//         </div>
//         <div className="right">
//           <h1>I want to become a seller</h1>
//           <div className="toggle">
//             <label htmlFor="">Activate the seller account</label>

//             <label className="switch">
//               <input type="checkbox" onChange={handleSeller} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//           <label htmlFor="">Phone Number</label>
//           <input
//             name="phone"
//             type="text"
//             placeholder="+1 234 567 89"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Description</label>
//           <textarea
//             placeholder="A short description of yourself"
//             name="desc"
//             id=""
//             cols="30"
//             rows="10"
//             onChange={handleChange}
//           ></textarea>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;


//with email
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Register.scss";
import { GoogleLogin } from "@react-oauth/google";

function Register() {
  const [formData, setFormData] = useState({
    username: "", // ✅ FIX: backend expects "username"
    email: "",
    password: "",
    country: "", // ✅ backend expects "country"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newRequest.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await newRequest.post("/auth/google", {
        token: credentialResponse.credential,
      });
      console.log("Google login success:", res.data);
      navigate("/"); // redirect after Google login
    } catch (err) {
      console.error("Google login failed:", err.response?.data || err.message);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-left-panel">
        
      </div>

      <div className="register-right-panel">
        <div className="form-container">
          <div className="header-text">
            <h2>Welcome to FreelanceX</h2>
                     </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="alex_jordan"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="alex.jordan@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                placeholder="India"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="signup-btn">
              Sign up
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <div className="google-section">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => console.log("Google login failed")}
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          <div className="signin-link">
            <span>
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
