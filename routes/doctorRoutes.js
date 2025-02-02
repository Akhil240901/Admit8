import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  doctorProfileInfoController,
  updateProfileController,
  getSingleDoctorController,
} from "../controllers/doctorController.js";

const router = express.Router();

//POST  || get doctor profile
router.post("/getAllDoctorInfo", authMiddleware, doctorProfileInfoController);

//POST || update and show doctor info in profile
router.post("/updateDoctorProfile", authMiddleware, updateProfileController);

//POST ||get single doctor
router.post("/getSingleDoctor", authMiddleware, getSingleDoctorController);

export default router;
