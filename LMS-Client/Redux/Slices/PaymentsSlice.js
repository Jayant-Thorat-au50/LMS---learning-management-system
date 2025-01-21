import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../src/Helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  api_key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonth: {},
  monthlySalesRecord: [],
};

const getRazorpayApiKey = createAsyncThunk("/razorpay/apiKey", async () => {
  try {
    const response = await axios.get(
      "http://localhost:6070/api/v1/payments/razorpay_ApiKey"
    );

    return response.data;
  } catch (error) {
    return toast.error("failed to load data");
  }
});
const purchaseSubcription = createAsyncThunk(
  "/purchaseSubscription",
  async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:6070/api/v1/payments/subscribe/${userId}`
      );

      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);

      return toast.error(error?.response?.data?.message);
    }
  }
);
const verifySubscription = createAsyncThunk(
  "/verifysubscription",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:6070/api/v1/payments/verify-subscription/${data[0]}`,
        data[1]
      );

      return response.data;
    } catch (error) {
      console.log(error);

      return toast.error("failed to load data");
    }
  }
);
const cancelSubscription = createAsyncThunk(
  "/cancelSubscription",
  async (data) => {
    console.log(data);
    
    try {
      const response = await axios.post(
        `http://localhost:6070/api/v1/payments/unsubscribe/${data[0]}`,
        data[1]
      );
      

      return  response;
    } catch (error) {
      console.log(error.response);

      return toast.error("failed to load data");
    }
  }
);

const paymentSlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorpayApiKey.fulfilled, (state, action) => {
        state.api_key = action?.payload?.razorpayApiKey;
      })
      .addCase(purchaseSubcription.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_Id;
      })
      .addCase(verifySubscription.fulfilled, (state, action) => {
        toast.success(action?.payload.message);
        state.isPaymentVerified = true;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
       
      })
  },
});

export default paymentSlice.reducer;
export {
  getRazorpayApiKey,
  purchaseSubcription,
  verifySubscription,
  cancelSubscription,
};
