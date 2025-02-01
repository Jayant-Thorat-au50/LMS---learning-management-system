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

// get the razorpay key started in the backend
const getRazorpayApiKey = createAsyncThunk("/razorpay/apiKey", async () => {
  try {
    const response = await axiosInstance.get("/payments/razorpay_ApiKey");
    return response.data;
  } catch (error) {
    return toast.error("failed to load data");
  }
});

// purchase course bundle
const purchaseSubcription = createAsyncThunk(
  "/purchaseSubscription",
  async (userId) => {
    try {
      const response = await axiosInstance.get(`/payments/subscribe/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);

      return toast.error(error?.response?.data?.message);
    }
  }
);

// handler fun after getting the payment data
const verifySubscription = createAsyncThunk(
  "/verifysubscription",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        `/payments/verify-subscription/${data[0]}`,
        data[1]
      );

      return response.data;
    } catch (error) {
      console.log(error);

      return toast.error("failed to load data");
    }
  }
);

// cancel subscription
const cancelSubscription = createAsyncThunk(
  "/cancelSubscription",
  async (data) => {
    console.log(data);
    
    try {
      const response = await axiosInstance.post(
        `/payments/unsubscribe/${data}`
      );
      return response.data;
    } catch (error) {
      return toast.error("failed to cancel the subscription data");
    }
  }
);

// get all the payment details
const getAllpaymentsList = createAsyncThunk("/getAllPaymetsList", async () => {
  try {
    const response = await axiosInstance.get("/payments/allPayments");

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});
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
        if (!action?.payload?.success) return;
        state.subscription_id = null;
      })
      .addCase(getAllpaymentsList.fulfilled, (state, action) => {
        if (!action?.payload?.success) return;
        state.allPayments = action?.payload?.subscriptions;
        state.finalMonth = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlyRecord;
      });
  },
});

export default paymentSlice.reducer;
export {
  getRazorpayApiKey,
  purchaseSubcription,
  verifySubscription,
  cancelSubscription,
  getAllpaymentsList,
};
