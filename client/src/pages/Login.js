import React from "react";
import "../style/Loginstyle.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        //console.log("After storing:", localStorage.getItem("token")); // Store the token

        message.success("User logged in successfully");
        navigate("/");
      } else {
        console.error("Error response:", res.data);
        message.error("Registration failed: " + res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Axios error:", error.response || error);
      message.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later..."
      );
    }
  };
  return (
    <div className="container">
      <Form className="form-body" layout="vertical" onFinish={handleSubmit}>
        <h1>Login</h1>
        <Form.Item label="Email" name="email">
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="text" placeholder="Enter your password" />
        </Form.Item>

        <Link to="/register" className="p-3 user">
          New User?
        </Link>

        <button className="button">Submit</button>
      </Form>
    </div>
  );
};

export default Login;
