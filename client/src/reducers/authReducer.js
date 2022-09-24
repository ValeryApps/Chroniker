import { createSlice } from "@reduxjs/toolkit";
import cookies from "js-cookie";

const cookies_user = cookies.get("user")
  ? JSON?.parse(cookies.get("user"))
  : null;

const initialState = {
  loading: false,
  error: "",
  user: cookies_user,
};

const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    register: (state, action) => {
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false,
      };
    },
    login: (state, action) => {
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false,
      };
    },
    verify: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    logout: (state, action) => {
      return {
        user: null,
      };
    },
  },
});

export const { register, login, verify, logout } = authSlice.actions;
export default authSlice.reducer;
