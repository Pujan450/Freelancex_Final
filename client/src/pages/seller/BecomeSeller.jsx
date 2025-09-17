// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import getCurrentUser from "../../utils/getCurrentUser";
// import "./BecomeSeller.scss";

// const BecomeSeller = () => {
//   const navigate = useNavigate();
//   const currentUser = getCurrentUser();
//   const [description, setDescription] = useState("");
//   const [skills, setSkills] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleBecomeSeller = async (e) => {
//     e.preventDefault();

//     if (!currentUser) {
//       return navigate("/login");
//     }

//     setLoading(true);
//     setError("");

//     try {
//       // The PUT request is correctly sent to the backend
//       await newRequest.put("/users/become-seller", {
//         description,
//         skills: skills.split(",").map((s) => s.trim()),
//       });

//       // After a successful request, update the user object in localStorage
//       localStorage.setItem(
//         "currentUser",
//         JSON.stringify({ ...currentUser, isSeller: true })
//       );

//       setLoading(false);
//       navigate("/mygigs");
//     } catch (err) {
//       setLoading(false);
//       setError("Failed to update account. Try again.");
//       console.error("Become Seller Error:", err);
//     }
//   };

//   return (
//     <div className="becomeSeller">
//       <h1>Become a Seller</h1>
//       <p>Fill in your details to start creating gigs and grow your freelancing business!</p>

//       <form onSubmit={handleBecomeSeller}>
//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             placeholder="Tell us about yourself..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Skills (comma separated)</label>
//           <input
//             type="text"
//             placeholder="e.g. JavaScript, React, Node.js"
//             value={skills}
//             onChange={(e) => setSkills(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Updating..." : "Become Seller"}
//         </button>
//       </form>

//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default BecomeSeller;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";
import "./BecomeSeller.scss";

const BecomeSeller = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  const [formData, setFormData] = useState({
    description: "",
  });

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newSkill.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(newSkill.trim())) {
        setSkills((prevSkills) => [...prevSkills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleBecomeSeller = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      return navigate("/login");
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        description: formData.description,
        skills: skills,
      };

      await newRequest.put("/users/become-seller", payload);

      const updatedUser = { ...currentUser, isSeller: true };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      setLoading(false);
      navigate("/mygigs");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to update account. Try again.");
      console.error("Become Seller Error:", err);
    }
  };

  const isFormValid = formData.description && skills.length > 0;

  return (
    <div className="becomeSeller">
      <div className="container">
        <h1>Become a Seller</h1>
        <p>Fill in your details to start creating gigs and grow your freelancing business!</p>

        <form onSubmit={handleBecomeSeller}>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Tell us about yourself..."
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills-input">Skills</label>
            <input
              id="skills-input"
              type="text"
              placeholder="Type and press Enter to add skills"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          
          {/* ✅ The skill tags are now in a separate div */}
          {skills.length > 0 && (
            <div className="skills-container">
              {skills.map((skill) => (
                <div className="skill-tag" key={skill}>
                  <span>{skill}</span>
                  <button type="button" onClick={() => handleRemoveSkill(skill)}>X</button>
                </div>
              ))}
            </div>
          )}

          <button type="submit" disabled={loading || !isFormValid}>
            {loading ? "Updating..." : "Become a Seller"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default BecomeSeller;