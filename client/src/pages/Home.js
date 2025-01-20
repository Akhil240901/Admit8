import axios from "axios";
import React, { useEffect } from "react";

const Home = () => {
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Ensure the token exists before making the request
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const res = await axios.post(
        "/api/v1/user/getUserdata", // Endpoint
        {}, // Request body (can be omitted if not needed)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct "Bearer" format
          },
        }
      );
      // Log or handle the API response
      console.log("User data:", res.data);
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

  return <div>Home</div>;
};

export default Home;
