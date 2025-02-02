import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { message, Table } from "antd";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const getDoctor = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        message.error("try again");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  const statusHandler = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/approveStatusChange",
        { doctorId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      } else {
        message.error("Unable to change status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              onClick={() => {
                statusHandler(record, "approved");
              }}
              className="btn btn-success"
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h2>Doctors</h2>
      <Table columns={column} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
