import express from "express";
import {
  authController,
  loginController,
  registerController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

//POST Method ||register
router.post("/register", registerController);
//POST Method ||login
router.post("/login", loginController);
//POST || Auth
router.post("/getUserData", authMiddleware, authController);
export default router;
