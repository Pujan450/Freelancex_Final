// import express from "express";
// import {
//   createGig,
//   deleteGig,
//   getGig,
//   getGigs
// } from "../controllers/gig.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// router.post("/", verifyToken, createGig);
// router.delete("/:id", verifyToken, deleteGig);
// router.get("/single/:id", getGig);
// router.get("/", getGigs);

// export default router;

// import express from "express";
// import {createGig,
//  deleteGig,
// getGig,
// getGigs,
//   getSuggestions
// } from "../controllers/gig.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// router.post("/", verifyToken, createGig);
// router.delete("/:id", verifyToken, deleteGig);
// router.get("/single/:id", getGig);
// router.get("/", getGigs);
// router.get("/suggestions", getSuggestions); // New route for suggestions

// export default router;


import express from "express";
import {createGig, deleteGig, getGig, getGigs, getSuggestions,getFeaturedGigs,getGigsforprojectcard} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createGig);
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);
router.get("/suggestions", getSuggestions); // ✅ suggestions route
router.get("/featured", getFeaturedGigs);
router.get("/", getGigsforprojectcard); // ✅ This is the main endpoint that fetches all gigs


export default router;
