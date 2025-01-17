import React from "react";
import "../style/Loginstyle.css";
import { Link } from "react-router-dom";
import { Form, Input } from "antd";
const Register = () => {
  const handleSubmit = (values) => {
    console.log(values);
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
        <Link to="/login" className="p-2">
          Already registered,user?
        </Link>
        <button>Submit</button>
      </Form>
    </div>
  );
};

export default Register;
