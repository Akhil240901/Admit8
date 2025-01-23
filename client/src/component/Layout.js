import React from "react";
import "../style/Layoutstyle.css";
import { menuData } from "./Data/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  console.log("user in redux" + user.name);
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h5>Doc App</h5>
            <hr />
          </div>
          <div className="menu">
            {menuData.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div className={`"menu-item" ${isActive && "active"}`}>
                    <i className={menu.icons} />
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="content">
          <div className="header">
            <div className="header-content">
              <i className="fa-solid fa-bell" />
              <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
