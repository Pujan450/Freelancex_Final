// import User from "../models/user.model.js";
// import Seller from "../models/seller.model.js";
// import createError from "../utils/createError.js";

// // Delete user
// export const deleteUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return next(createError(404, "User not found!"));

//     if (req.userId !== user._id.toString()) {
//       return next(createError(403, "You can delete only your account!"));
//     }

//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).send("User deleted successfully.");
//   } catch (err) {
//     next(err);
//   }
// };

// // Get full user (private, returns everything)
// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return next(createError(404, "User not found!"));

//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };

// // ✅ Public user (only safe fields)
// export const getPublicUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id).select("username img country");
//     if (!user) return next(createError(404, "User not found!"));

//     res.status(200).json(user);
//   } catch (err) {
//     next(err);
//   }
// };

// // Become a Seller
// export const becomeSeller = async (req, res, next) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { $set: { isSeller: true } },
//       { new: true }
//     );

//     if (!updatedUser) return next(createError(404, "User not found"));

//     // reissue JWT with updated seller flag
//     const token = jwt.sign(
//       { id: updatedUser._id, isSeller: updatedUser.isSeller },
//       process.env.JWT_KEY,
//       { expiresIn: "7d" }
//     );

//     const { password, ...info } = updatedUser._doc;

//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .status(200)
//       .json(info);
//   } catch (err) {
//     next(err);
//   }
// };

// import User from "../models/user.model.js";
// import Seller from "../models/seller.model.js";
// import createError from "../utils/createError.js";
// import jwt from "jsonwebtoken"; // Add this import

// // Delete user
// export const deleteUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return next(createError(404, "User not found!"));
//     if (req.userId !== user._id.toString()) {
//       return next(createError(403, "You can delete only your account!"));
//     }
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).send("User deleted successfully.");
//   } catch (err) {
//     next(err);
//   }
// };

// // Get full user (private, returns everything)
// // export const getUser = async (req, res, next) => {
// //   try {
// //     const user = await User.findById(req.params.id);
// //     if (!user) return next(createError(404, "User not found!"));
// //     res.status(200).json(user);
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// // ✅ Public user (only safe fields)
export const getPublicUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("username img country");
    if (!user) return next(createError(404, "User not found!"));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// export const getUser = async (req, res, next) => {
//   try {
//     // Find the user by their username. Note: You should be using a unique field.
//     const user = await User.findOne({ username: req.params.username });

//     // Handle the case where the user is not found
//     if (!user) {
//       return next(createError(404, "User not found!"));
//     }

//     res.status(200).send(user);
//   } catch (err) {
//     next(err);
//   }
// };
// // --- START: UPDATED CODE FOR BECOME SELLER ---
// export const becomeSeller = async (req, res, next) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.userId,
//       { $set: { isSeller: true } },
//       { new: true }
//     );

//     if (!updatedUser) return next(createError(404, "User not found"));

//     // Reissue JWT with updated seller flag
//     const token = jwt.sign(
//       { id: updatedUser._id, isSeller: updatedUser.isSeller },
//       process.env.JWT_KEY,
//       { expiresIn: "7d" }
//     );

//     const { password, ...info } = updatedUser._doc;

//     // Send the new token in a cookie. The browser handles this.
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .status(200)
//       .json(info);
//   } catch (err) {
//     next(err);
//   }
// };
// // --- END: UPDATED CODE FOR BECOME SELLER ---

// src/controllers/user.controller.js

import User from "../models/user.model.js";
import Seller from "../models/seller.model.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));
    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User deleted successfully.");
  } catch (err) {
    next(err);
  }
};

// ✅ Get a single user's profile (by username)
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return next(createError(404, "User not found!"));
    }

    const userInfo = {
      _id: user._id,
      username: user.username,
      img: user.img,
      country: user.country,
      isSeller: user.isSeller,
      desc: user.desc,
    };

    if (user.isSeller) {
      const sellerInfo = await Seller.findOne({ userId: user._id });
      if (sellerInfo) {
        Object.assign(userInfo, {
          description: sellerInfo.description,
          skills: sellerInfo.skills,
          rating: sellerInfo.rating,
          completedOrders: sellerInfo.completedOrders,
          portfolio: sellerInfo.portfolio,
        });
      }
    }

    res.status(200).send(userInfo);
  } catch (err) {
    next(err);
  }
};

// ✅ You should remove the getPublicUser and the second getUser functions
// as they are redundant now. The new getUser function handles both cases.

// --- START: UPDATED CODE FOR BECOME SELLER ---
export const becomeSeller = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: { isSeller: true } },
      { new: true }
    );

    if (!updatedUser) return next(createError(404, "User not found"));

    // Reissue JWT with updated seller flag
    const token = jwt.sign(
      { id: updatedUser._id, isSeller: updatedUser.isSeller },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    const { password, ...info } = updatedUser._doc;

    // Send the new token in a cookie. The browser handles this.
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json(info);
  } catch (err) {
    next(err);
  }
};
// --- END: UPDATED CODE FOR BECOME SELLER ---