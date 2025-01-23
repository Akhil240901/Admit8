import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Updates the user state
    },
  },
});

export const { setUser } = userSlice.actions; // Export the action
export default userSlice.reducer; // Export the reducer
