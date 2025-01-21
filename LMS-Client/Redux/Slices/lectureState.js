import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../src/Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  lectures: [],
};

const getCourseLectures = createAsyncThunk(
  "course/lectures",
  async (courseId) => {
    try {
      const response = axiosInstance.get(`/course/get-one-course/${courseId}`);

      toast.promise(response, {
        loading: "getting course lectures",
        success: (res) => {
          return res?.data?.message;
        },
        error: "failed to load the lectures",
      });

      return (await response).data;
    } catch (error) {
        return toast.error(error?.response?.data?.message)
    }
  }
);

const addNewLecture = createAsyncThunk("course/addLecture", async (data) => {

    const response = axiosInstance.post(`/course/add-lecture/${data[0]}`, data[1]);

    toast.promise(response, {
        loading:"wait! adding new lecture",
        success:(res) => {
            return res?.data?.message
        },
        error:"failed to add a new lecture"
    })

    return (await response).data
});

const deleteLecture = createAsyncThunk("course/deleteLecture", async(data) => {

    const response = axiosInstance.delete(`/course/delete-lecture/${data[0]}/${data[1]}`)

    toast.promise(response, {
        loading:"wait! deleting the lecture from the course",
        success:(res) => {
            return res?.data?.message
        },
        error:"failed to delete the lecture"
    });

    return (await response).data
})

const lectureSlice = createSlice({
  name: "lectures",
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
    .addCase(getCourseLectures.fulfilled, (state, action) => {
        console.log(action);
        if(!action?.payload?.success) return
        state.lectures = action?.payload?.Course?.lectures
    })
    .addCase(addNewLecture.fulfilled, (state, action) => {
        console.log(action);
        if(!action?.payload?.success) return;
        state.lectures = action?.payload?.course?.lectures
    })
    .addCase(deleteLecture.fulfilled, (state, action) => {
        console.log(action);
        if(!action?.payload?.success) return;
        state.lectures = action?.payload?.course?.lectures
    })
  }
});

export default lectureSlice.reducer;
