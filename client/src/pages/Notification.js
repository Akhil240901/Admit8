import React from "react";
import Layout from "../component/Layout";
import { message, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const markAllHandler = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Marked as read");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("api" + error);
      dispatch(hideLoading());
      message.error("Something went wrong!");
    }
  };

  const deleteAllHandler = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Deleted notification successfully");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error("api" + error);
      dispatch(hideLoading());
      message.error("Something went wrong!");
    }
  };

  // Define tab items correctly
  const tabItems = [
    {
      key: "unread",
      label: "Unread",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={markAllHandler}
              style={{ cursor: "pointer" }}
            >
              Mark all as read
            </h4>
          </div>
          {user?.notification.map((notificationMSG, index) => (
            <div
              key={notificationMSG.id || index} // Ensure a unique key
              className="card"
              style={{ cursor: "pointer", padding: "10px", margin: "5px 0" }}
            >
              <div
                className="card-text"
                onClick={() => navigate(notificationMSG.onClickPath)} // Wrapped in an arrow function
              >
                {notificationMSG.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
    {
      key: "read",
      label: "Read",
      children: (
        <>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={deleteAllHandler}
              style={{ cursor: "pointer" }}
            >
              Delete all
            </h4>
          </div>
          {user?.seenNotification.map((notificationMSG, index) => (
            <div
              key={notificationMSG.id || index} // Ensure a unique key
              className="card"
              style={{ cursor: "pointer", padding: "10px", margin: "5px 0" }}
            >
              <div
                className="card-text"
                onClick={() => navigate(notificationMSG.onClickPath)} // Wrapped in an arrow function
              >
                {notificationMSG.message}
              </div>
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Notifications</h1>
      <Tabs items={tabItems} />
    </Layout>
  );
};

export default Notification;
