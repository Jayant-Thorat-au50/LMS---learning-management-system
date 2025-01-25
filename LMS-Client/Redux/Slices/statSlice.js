import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helpers imports
import { toast } from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
  allUserCount: "",
  subscribedUserCount: "",
};

// getting the user's data
const getAllUserData = createAsyncThunk("getAllUsersData", async () => {
  try {
    const response = axiosInstance.get("/user/getAllUserData");

    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message, 400);
  }
});

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserData.fulfilled, (state, action) => {
      if (!action?.payload?.success) return;
      state.allUserCount = action?.payload?.allUserCount?.length;
      state.subscribedUserCount = action?.payload?.subscribedUsers?.length;
    });
  },
});

export default statSlice.reducer;
export { getAllUserData };
