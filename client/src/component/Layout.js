import React from "react";
import "../style/Layoutstyle.css";
import { adminData, userData } from "./Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge, message } from "antd";
import { clearUser } from "../redux/features/userSlice";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(clearUser());
    message.success("Logout successfully");
    navigate("/login");
  };

  /**
   * doctor menu
   */
  const doctorData = [
    {
      name: "Home",
      path: "/",
      icons: "fa-solid fa-house-chimney",
    },
    {
      name: "Apointment",
      path: "/doctor-appointment",
      icons: "fa-solid fa-calendar-check",
    },
    {
      name: "Profile",
      path: `/doctors/profile/${user?._id}`,
      icons: "fa-solid fa-user",
    },
  ];

  const sidebarMenu = user?.isAdmin
    ? adminData
    : user.isDoctor
    ? doctorData
    : userData;
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h5>Doc App</h5>
            <hr />
          </div>
          <div className="menu">
            {sidebarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.path;

              return (
                <div
                  key={menu.path || index}
                  className={`menu-item ${isActive ? "active" : ""}`}
                >
                  <i className={menu.icons} />
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item`} onClick={logoutHandler}>
              <i className="fa-solid fa-right-from-bracket" />
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="header-content">
              <Badge
                count={user?.notification?.length || 0}
                className="badge-notification"
                onClick={() => navigate("/notification")}
              >
                <i className="fa-solid fa-bell" />
              </Badge>
              <h4>{user?.name}</h4>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
