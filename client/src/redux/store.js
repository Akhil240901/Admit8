import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features/alert";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
  },
});
