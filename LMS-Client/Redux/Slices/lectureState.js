import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../src/Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  lectures: [],
};

const getCourseLectures = createAsyncThunk(
  "course/lectures",
  async (courseId) => {
    console.log('courseId is');
    
    try {
      const response = axios.get(`http://localhost:6070/api/v1/course/get-one-course/${courseId}`);

      toast.promise(response, {
        loading: "getting course lectures",
        success: (res) => {
          return res?.data?.message;
        },
        error: "failed to load the lectures",
      });

      return (await response).data;
    } catch (error) {
        console.log(error);
        
      return toast.error(error?.response?.data?.message);
    }
  }
);

const addNewLecture = createAsyncThunk("course/addLecture", async (data) => {
  
 try {
  const response = axios.post(`http://localhost:6070/api/v1/course/add-lecture/${data[0]}`, data[1])
  toast.promise(response, {
    loading: "wait! adding new lecture",
    success: (res) => {
      return res?.data?.message;
    },
    error: "failed to add a new lecture",
  });

  return (await response).data;
 } catch (error) {
  console.log(error);
  toast.error(error?.response?.data?.message)
  
 }
});

const deleteLecture = createAsyncThunk("course/deleteLecture", async (data) => {
  const response = axiosInstance.delete(
    `/course/delete-lecture/${data[0]}/${data[1]}`
  );

  toast.promise(response, {
    loading: "wait! deleting the lecture from the course",
    success: (res) => {
      return res?.data?.message;
    },
    error: "failed to delete the lecture",
  });

  return (await response).data;
});

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLectures.fulfilled, (state, action) => {
        console.log(action);
        if (!action?.payload?.success) return;
        state.lectures = action?.payload?.Course?.lectures;
        console.log('done');
        
      })
      .addCase(addNewLecture.fulfilled, (state, action) => {
        console.log(action);
        if (!action?.payload?.success) return;
        state.lectures = action?.payload?.course?.lectures;
      })
      .addCase(deleteLecture.fulfilled, (state, action) => {
        console.log(action);
        if (!action?.payload?.success) return;
        state.lectures = action?.payload?.course?.lectures;
      });
  },
});

export default lectureSlice.reducer;
export {getCourseLectures, addNewLecture, deleteLecture}
