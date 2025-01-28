import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// helpers imports
import toast from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
coursesList : []
};

// get the list all available courses in the db
export const getcoursesList = createAsyncThunk("Course/getAllCourses", async () => {
  try {
    const res = axiosInstance.get(
      "/course");

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

// add course to the course collection in the db
export const addCourse = createAsyncThunk("course/create",async (courseData) => {
  try {

    const response = axiosInstance.post("/course/add-course", courseData,
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

export const deleteCourse = createAsyncThunk('course/delete', async (courseId) => {
  console.log(courseId);
  
  try {
    const response = axiosInstance.delete(`/course/delete-course/${courseId}`);
       toast.promise( response, {
        loading:"wait! Deeting your course",
        success:(data) => {
          return data.data.message
        },
        error:"failed to delete the course"
       })

     
       

       return (await response).data
  } catch (error) {
    return toast.error(error?.response?.data?.message)
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
