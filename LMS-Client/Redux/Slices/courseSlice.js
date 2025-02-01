import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

// helpers imports
import toast from "react-hot-toast";
import axiosInstance from "../../src/Helpers/axiosInstance";

const initialState = {
coursesList : [],
catagoryList:[]
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

// delete a course from the db
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

// edit a course
export const editCourse = createAsyncThunk('course/updateCourse', async (data) => {

  try {
    const response = await axiosInstance.put(`/course/update-course/${data[0]}`, data[1]);

    console.log(response);

    return response.data;
    
    
  } catch (error) {
    return toast.error(error?.response?.data?.message)
  }
})

export const getOneCourse = createAsyncThunk('course/getCourse', async (cid) => {

  try {
    const response = await axiosInstance.put(`/course/get-one-course/${cid}`);

    console.log(response);

    return response.data;
    
    
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
    state.catagoryList = [...new Set(action?.payload?.coursesList.map(c => c.catagory))]
    
  })

  },
});

export default courseSlice.reducer
