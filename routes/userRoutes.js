import express from "express";
import {
  authController,
  loginController,
  registerController,
  applyDoctorController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

//POST Method ||register
router.post("/register", registerController);
//POST Method ||login
router.post("/login", loginController);
//POST || Auth
router.post("/getUserData", authMiddleware, authController);
//post || Apply doctor
router.post("/apply-doctor", authMiddleware, applyDoctorController);
//post || getAllNotification
export default router;
