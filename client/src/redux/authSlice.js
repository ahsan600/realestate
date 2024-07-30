import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "Authorization",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log(state, action.payload);
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
