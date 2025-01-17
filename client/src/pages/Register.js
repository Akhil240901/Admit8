import React from "react";
import "../style/Loginstyle.css";
import { Link } from "react-router-dom";
const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target; // Reference to the form element
    const formData = new FormData(form); // Capture form data

    // Log each field value
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <div className="container">
      <form className="form-body" onSubmit={handleSubmit}>
        <h1> Register Form</h1>
        <div class="mb-3">
          <label for="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name=""
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="mobilenumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="mobilenumber"
            name="mobilenumber"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="submit p-4">
          <Link className="p-3" to="/login">
            Already registered User?
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
