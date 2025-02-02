import React, { useState, useEffect } from "react";
import Layout from "../../component/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const params = useParams();
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Ensure the token exists before making the request
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const res = await axios.post(
        "/api/v1/doctor/getSingleDoctor",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct "Bearer" format
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data || []);
      }
    } catch (error) {
      // Log the error and handle it appropriately
      if (error.response) {
        console.error("API Error:", error.response.data.message); // Backend error message
      } else {
        console.error("Request Error:", error.message); // General request error
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleAvailability = async () => {
    const token = localStorage.getItem("token");
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/checkAvailability",
        {
          doctorId: params.doctorId,
          time: time,
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        setIsAvailable(true);
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response) {
        console.error("API Error:", error.response.data.message); // Backend error message
      } else {
        console.error("Request Error:", error.message); // General request error
      }
    }
  };

  const bookingHandler = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!date && !time) {
        return alert("Date and Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          time: time,
          date: date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      if (error.response) {
        console.error("API Error:", error.response.data.message); // Backend error message
      } else {
        console.error("Request Error:", error.message); // General request error
      }
    }
  };
  return (
    <Layout>
      <h1>Booking Page</h1>
      <div className="m-2">
        {doctor && (
          <div>
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fee per consultation: {doctor.feePerConsultation}</h4>
            <div className="d-flex flex-column w-50 3-2">
              <DatePicker
                className="mt-2"
                format="DD:MM:YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD:MM:YYYY"))
                }
              />

              <TimePicker
                className="mt-2"
                format="HH:mm"
                onChange={(value) =>
                  setTime(moment(value, "HH:mm").format("HH:mm"))
                }
              />

              <button
                className="btn btn-primary mt-2"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={bookingHandler}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
