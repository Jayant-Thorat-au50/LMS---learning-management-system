import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/Authslice'
import courseReducer from './Slices/courseSlice'
import razorpayReducer from './Slices/PaymentsSlice'

const store = configureStore({
    reducer:{
     authstate:authReducer,
     courseState:courseReducer,
     paymentstate:razorpayReducer
    },
    devTools:true
})

export default store;