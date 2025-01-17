import React from "react";
import "../style/Loginstyle.css";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
const Login = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className="container">
      <Form className="form-body" layout="vertical" onFinish={handleSubmit}>
        <h1>Login</h1>
        <Form.Item label="Name" name="name">
          <Input type="text" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Link to="/register">New User?</Link>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Login;
