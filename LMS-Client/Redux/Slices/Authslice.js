import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../.././src/Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || " ",
  data: localStorage.getItem("data") || {},
};

export const register = createAsyncThunk("auth/signUp", async (singnUpData) => {
  try {
    const res = axios.post("http://localhost:6070/api/v1/user/register",singnUpData)
    toast.promise(res, {
      loading: "wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to create your acc",
    });
    return (await res).data;
  } catch (error) {
    return toast.error(error.message);
  }
});

const AuthSlice = {
  name: "Auth",
  initialState,
  reducers: {},
};

export default AuthSlice.reducers;
