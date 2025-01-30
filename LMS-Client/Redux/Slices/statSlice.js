import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helpers imports
import { toast } from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
  allUserCount: "",
  subscribedUserCount: "",
  allUsers:[]
};

// getting the user's data
const getAllUserData = createAsyncThunk("getAllUsersData", async () => {
  try {
    const response = await axiosInstance.get("/user/getAllUserData");

    return response.data
  } catch (error) {
    toast.error(error?.response?.data?.message, 400);
  }
});

//filtering the users
const filterUsers = createAsyncThunk('user/filter', async (obj) => {
try {
  const response = await axiosInstance.post('/user/filter-users', obj);
  console.log(response);
  return response.data
} catch (error) {
  return toast.error(error?.response?.data?.message)
}



})

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUserData.fulfilled, (state, action) => {
      if (!action?.payload?.success) return;
      state.allUserCount = action?.payload?.allUserCount?.length;
      state.allUsers = action?.payload?.allUserCount
      state.subscribedUserCount = action?.payload?.subscribedUsers?.length;
    });
  },
});

export default statSlice.reducer;
export { getAllUserData, filterUsers };
