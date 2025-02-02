import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import axios from "axios";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const Users = () => {
  const [users, setUsers] = useState([]);
  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // console.log("API Response:", res.data); // ✅ Debug the response

      if (res.data.success) {
        // console.log("Users before setting state:", users); // ✅ Debug before setting state
        setUsers(res.data.data);
        //console.log("Users after setting state:", res.data.users); // ✅ Debug after setting state
        message.success("User Data");
      } else {
        message.error("Can't get users data");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong!!");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const column = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h2>Users</h2>
      {console.log(users)}
      <Table columns={column} dataSource={users} />
      {console.log(users)}
    </Layout>
  );
};

export default Users;
