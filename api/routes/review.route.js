// import express from "express";
// import { verifyToken } from "../middleware/jwt.js";
// import {
//   createReview,
//   getReviews,
//   deleteReview,
// } from "../controllers/review.controller.js";

// const router = express.Router();

// router.post("/", verifyToken, createReview )
// router.get("/:gigId", getReviews )
// router.delete("/:id", deleteReview)

// export default router;


import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createReview, getReviews, deleteReview } from "../controllers/review.controller.js";

const router = express.Router();

// Create review (buyer only)
router.post("/", verifyToken, createReview);

// Get reviews (public)
router.get("/:gigId", getReviews);

// Delete review (owner only)
router.delete("/:id", verifyToken, deleteReview);

export default router;
