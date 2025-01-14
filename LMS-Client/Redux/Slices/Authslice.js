import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../.././src/Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || " ",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const register = createAsyncThunk("auth/signUp", async (singnUpData) => {
  try {
    const res = axios.post(
      "http://localhost:6070/api/v1/user/register",
      singnUpData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.promise(res, {
      loading: "wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to create your acc",
    });

    return (await res).data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});
export const loginNow = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const res = axios.post(
      "http://localhost:6070/api/v1/user/login",
      loginData
    );
    toast.promise(res, {
      loading: "wait! loggin in",
      success: (response) => {
        return response?.data?.message;
      },
      error: "failed to log in",
    });
    return (await res).data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = axios.get("http://localhost:6070/api/v1/user/logout");
    toast.promise(res, {
      loading: "wait! logging out",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to log out",
    });

    return (await res).data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});
export const userUpdate = createAsyncThunk(
  "user/profile/update",
  async (data) => {
    try {
      const res = axios.put(
        `http://localhost:6070/api/v1/user/user-update/${data[0]}`,
        data[1],
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.promise(res, {
        loading: "wait! user update is in progress",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to update profile",
      });

      return (await res).data;
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk("user/me", async (userId) => {
  try {
    const res = axios.get(`http://localhost:6070/api/v1/user/me/${userId}`);
    return (await res).data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginNow.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload.user?.role);
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear();
        state.data = {};
        state.role = " ";
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.User));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.User?.role);
        (state.isLoggedIn = true), (state.data = action?.payload?.User);
        state.role = action?.payload?.User?.role;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.User));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.User?.role);
        state.data = action?.payload?.User;
        state.role = action?.payload?.User?.role;
        state.isLoggedIn = true;
      });
  },
});

export default AuthSlice.reducer;
