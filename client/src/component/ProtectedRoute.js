// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../redux/features/userSlice";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import { message } from "antd";

// export default function ProtectedRoute({ children }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.user);

//   const getUser = async () => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/user/getUserData",
//         { token: localStorage.getItem("token") },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       dispatch(hideLoading());
//       console.log(res.data.success);
//       if (res.data.success) {
//         dispatch(setUser(res.data.data));
//         console.log(user + " after");
//       } else {
//         <Navigate to="/login" />;
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.error("Error fetching user data:", error);
//       message.error("Something went wrong. Please log in again.");
//     }
//   };

//   useEffect(() => {
//     if (!user) {
//       getUser();
//     }
//   }, [user]);

//   if (localStorage.getItem("token")) {
//     return children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { message } from "antd";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = React.useState(true); // To handle async loading state

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        message.error("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Clear invalid token
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong. Please log in again.");
      localStorage.removeItem("token");
    } finally {
      setLoading(false); // Stop loading once the request is done
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setLoading(false); // If the user is already present, stop loading
    }
  }, [user]);

  // Redirect to login if no token exists
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  // Show a loader or placeholder while loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render children if the user is authenticated
  return children;
}
