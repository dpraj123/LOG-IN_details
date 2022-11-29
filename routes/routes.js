import express from "express";
const router = express.Router();
import UserController from "../controller/controller.js";

// public Routes

//------------------------register
router.post("/register", UserController.userRegistration);

//-----------------------LogIN
router.post("/login", UserController.userLogin);
// protectected routes

//exports
export default router;
