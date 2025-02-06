import React from "react";
import "../style/Loginstyle.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      // API call
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered successfully!");
        navigate("/login");
      } else {
        console.error("Error response:", res.data);
        message.error("Registration failed: " + res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // Improved error logging
      console.error("Axios error:", error.response || error);
      message.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="container">
      <Form className="form-body" layout="vertical" onFinish={handleSubmit}>
        <h1>New User</h1>
        <Form.Item label="Full Name" name="name">
          <Input type="text" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Mobile Number" name="number">
          <Input type="text" placeholder="Enter your mobile number" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" placeholder="Enter your password" />
        </Form.Item>
        <Link to="/login" className="p-2 user">
          Already registered, user?
        </Link>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Register;
