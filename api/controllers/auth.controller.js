//semi-final with out google id 

// import User from "../models/user.model.js";
// import createError from "../utils/createError.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // Register
// export const register = async (req, res, next) => {
//   try {
//     const hash = bcrypt.hashSync(req.body.password, 5);
//     const newUser = new User({
//       ...req.body,
//       password: hash,
//     });

//     await newUser.save();
//     console.log("BODY RECEIVED: ", req.body);

//     return res.status(201).send("User has been successfully created");
//   } catch (err) {
//     return next(err);
//   }
// };

// // Login
// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const isCorrect = bcrypt.compareSync(req.body.password, user.password);
//     if (!isCorrect)
//       return next(createError(400, "Wrong password or Username!"));

//     const token = jwt.sign(
//       {
//         id: user._id,
//         isSeller: user.isSeller,
//       },
//       process.env.JWT_KEY
//     );

//     const { password, ...info } = user._doc;

//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .send(info);

//     console.log("Sending payload:", {
//       username: req.body.username,
//       password: "HIDDEN", // never log plain passwords
//     });
//   } catch (err) {
//     return next(err);
//   }
// };

// // Logout
// export const logout = (req, res) => {
//   res
//     .clearCookie("accessToken", {
//       sameSite: "none",
//       secure: true,
//     })
//     .status(200)
//     .send("User has been logged out.");
// };



//final code with username

// import User from "../models/user.model.js";
// import createError from "../utils/createError.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library"; // Import Google Auth Library

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // Register
// export const register = async (req, res, next) => {
//   try {
//     const hash = bcrypt.hashSync(req.body.password, 5);
//     const newUser = new User({
//       ...req.body,
//       password: hash,
//     });

//     await newUser.save();
//     console.log("BODY RECEIVED: ", req.body);

//     return res.status(201).send("User has been successfully created");
//   } catch (err) {
//     return next(err);
//   }
// };

// // Login
// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const isCorrect = bcrypt.compareSync(req.body.password, user.password);
//     if (!isCorrect)
//       return next(createError(400, "Wrong password or Username!"));

//     const token = jwt.sign(
//       {
//         id: user._id,
//         isSeller: user.isSeller,
//       },
//       process.env.JWT_KEY
//     );

//     const { password, ...info } = user._doc;

//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .send(info);

//     console.log("Sending payload:", {
//       username: req.body.username,
//       password: "HIDDEN", // never log plain passwords
//     });
//   } catch (err) {
//     return next(err);
//   }
// };

// // Google Login
// export const googleLogin = async (req, res, next) => {
//   try {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     const payload = ticket.getPayload();
//     const { sub: googleId, name, email, picture } = payload;

//     // Check if user already exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create new user if they don't exist
//       user = new User({
//         username: email.split("@")[0], // Simple username from email
//         email,
//         img: picture,
//         isSeller: false,
//         googleId,
//       });
//       await user.save();
//     }

//     // Create JWT token and set cookie
//     const jwtToken = jwt.sign(
//       {
//         id: user._id,
//         isSeller: user.isSeller,
//       },
//       process.env.JWT_KEY
//     );

//     const { password, ...info } = user._doc;

//     res
//       .cookie("accessToken", jwtToken, {
//         httpOnly: true,
//       })
//       .status(200)
//       .send(info);

//     console.log("Google login successful for user:", email);
//   } catch (err) {
//     return next(err);
//   }
// };

// // Logout
// export const logout = (req, res) => {
//   res
//     .clearCookie("accessToken", {
//       sameSite: "none",
//       secure: true,
//     })
//     .status(200)
//     .send("User has been logged out.");
// };



//code with email

import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: Generate JWT + send cookie
const generateToken = (user, res) => {
  const token = jwt.sign(
    { id: user._id, isSeller: user.isSeller },
    process.env.JWT_KEY,
    { expiresIn: "7d" } // good practice: set expiry
  );

  const { password, ...info } = user._doc;

  res
    .cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // secure only in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .send(info);
};

// Register
export const register = async (req, res, next) => {
  try {
    // check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return next(createError(400, "Email already registered!"));

    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();

    console.log("✅ User registered:", newUser.email);
    return res.status(201).send("User has been successfully created");
  } catch (err) {
    return next(err);
  }
};

// Login (using email)
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    if (!user.password) {
      return next(createError(400, "This account is registered with Google. Use Google Login!"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong email or password!"));

    generateToken(user, res);

    console.log("✅ Login successful:", user.email);
  } catch (err) {
    return next(err);
  }
};

// Google Login
export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username: email.split("@")[0],
        email,
        img: picture,
        isSeller: false,
        googleId,
      });
      await user.save();
      console.log("✅ New Google user created:", email);
    } else if (!user.googleId) {
      // If same email was used to register normally → attach googleId
      user.googleId = googleId;
      await user.save();
      console.log("🔄 Linked Google account to existing user:", email);
    }

    generateToken(user, res);

    console.log("✅ Google login successful:", email);
  } catch (err) {
    return next(err);
  }
};

// Logout
export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .send("User has been logged out.");
};
