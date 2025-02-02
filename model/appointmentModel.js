import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  userInfo: {
    type: String,
    required: true,
  },
  doctorInfo: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
