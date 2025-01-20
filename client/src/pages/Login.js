import React from "react";
import "../style/Loginstyle.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/login", values);
      console.log("user token " + res.data.token);
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
        <h1>Login</h1>
        <Form.Item label="Email" name="email">
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="text" placeholder="Enter your password" />
        </Form.Item>
        <Link to="/register" className="p-3">
          New User?
        </Link>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Login;
