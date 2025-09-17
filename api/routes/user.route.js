// import express from "express";
// import {deleteUser,getUser} from "../controllers/user.controller.js";
// import {verifyToken} from "../middleware/jwt.js"

// const router=express.Router();

// router.delete("/:id",verifyToken,deleteUser);
// router.get("/:id",verifyToken,getUser);

// export default router;

// import express from "express";
// import { deleteUser, getUser, getPublicUser } from "../controllers/user.controller.js";
// import { verifyToken } from "../middleware/jwt.js";

// const router = express.Router();

// // Protected delete (must be logged in & owner)
// router.delete("/:id", verifyToken, deleteUser);

// // Public user info (anyone can see seller username + img)
// router.get("/:id/public", getPublicUser);

// // Protected full user details (if needed for dashboard/profile)
// router.get("/:id", verifyToken, getUser);

// export default router;




import express from "express";
import {
  deleteUser,
  getUser,
  getPublicUser,
  becomeSeller,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Delete user (auth required)
router.delete("/:id", verifyToken, deleteUser);

// Get full user (internal use, not public)
router.get("/find/:id", getUser);

// ✅ Fixed: Get public user info
router.get("/:id/public", getPublicUser);

// Become a seller (auth required)
router.put("/become-seller", verifyToken, becomeSeller);
router.get("/:username", getUser);

export default router;
