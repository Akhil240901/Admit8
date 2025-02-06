import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import { Row } from "antd";
import DoctorList from "../component/DoctorList";

const Home = () => {
  const [doctor, setDoctor] = useState([]);
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Ensure the token exists before making the request
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const res = await axios.get(
        "/api/v1/user/getAllDoctors", // Endpoint
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

  return (
    <Layout>
      <h1>Home</h1>
      <Row>
        {doctor.length > 0 ? (
          doctor.map((doc) => <DoctorList key={doc._id} doctor={doc} />)
        ) : (
          <p>No doctors available</p>
        )}
      </Row>
    </Layout>
  );
};

export default Home;
