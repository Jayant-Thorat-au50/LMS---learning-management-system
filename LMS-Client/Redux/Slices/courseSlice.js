import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
coursesList : []
};

export const getcoursesList = createAsyncThunk("Course/getAllCourses", async () => {
  try {
    const res = axios.get(
      "http://localhost:6070/api/v1/course");

    toast.promise(res, {
      loading: "wait! getting the courses",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to get courses",
    });

    return (await res).data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});

export const addCourse = createAsyncThunk("course/create",async (courseData) => {
  try {

    const response = axios.post("http://localhost:6070/api/v1/course/add-course", courseData,
     {
      headers: {
        'Content-Type': 'multipart/form-data',
      }}
    );
    toast.promise(response,{
      loading:"wait! creating your course",
      success:(data) => {
        return data?.data?.message
      },
      error:'failed to create a course'
    })

    return (await response).data
    
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
})


const courseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
  .addCase(getcoursesList.fulfilled, (state, action) => {
    state.coursesList = (action?.payload?.coursesList)
  })
  },
});

export default courseSlice.reducer
