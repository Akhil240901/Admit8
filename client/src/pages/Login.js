import React from "react";
import "../style/Loginstyle.css";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
const Login = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Name" name="name">
          <Input type="text" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Login;