import React, { useEffect, useState } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import { Table } from "antd";

import moment from "moment";
const AppointmentPage = () => {
  const [appointment, setAppointment] = useState();
  const appointmentData = async (req, res) => {
    try {
      const token = localStorage.getItem("token");

      // Ensure the token exists before making the request
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
      const res = await axios.get("/api/v1/user/book-appointment", {
        headers: {
          Authorization: `Bearer ${token}`, // Correct "Bearer" format
        },
      });
      if (res.data.success) {
        setAppointment(res.data.data);
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
    appointmentData();
  }, []);

  const column = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "time",
      render: (text, record) => (
        <span>
          {record.date} {record.time}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h1>Appointment Page</h1>
      <Table columns={column} dataSource={appointment}></Table>
    </Layout>
  );
};

export default AppointmentPage;
