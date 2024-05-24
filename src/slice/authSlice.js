import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/services/axios";

// Define a type for the slice state

const initialState = {
  isAuth: false,
  username: "",
  access_token: "",
  email: "",
  id: "",
  roles: {},
};
// Define the initial state using that type

export const accountUser = createAsyncThunk("/account", async () => {
  const response = await axios.get("/account", {
    withCredentials: true,
  });
  if (response?.code === 0) {
    localStorage.setItem("isAuth", response.data.isAuth);
    localStorage.setItem("prePath", window.location.pathname);
    return response.data;
  } else {
    return { ...initialState };
  }
});

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(accountUser.fulfilled, (state, action) => {
      // Nếu yêu cầu thành công, cập nhật trạng thái của slice dựa trên dữ liệu nhận được từ máy chủ
      state.isAuth = action.payload.isAuth;
      state.username = action.payload.username;
      state.access_token = action.payload.access_token;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.id = action.payload.id;
    });
  },
});

export const { login, logout } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
