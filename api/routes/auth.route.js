//semi-final with out google id 
    

// import express from "express";
// import {register,login,logout} from "../controllers/auth.controller.js"

// const router=express.Router();

// router.post("/register",register);
// router.post("/login",login);
// router.post("/logout",logout);
// export default router;

import express from "express";
import {register,login,logout, googleLogin} from "../controllers/auth.controller.js"

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/google", googleLogin); // New route for Google login

export default router;