import {configureStore} from '@reduxjs/toolkit'

// reducers imports
import authReducer from './Slices/Authslice'
import courseReducer from './Slices/courseSlice'
import razorpayReducer from './Slices/PaymentsSlice'
import lecturesReducer from './Slices/lectureState'
import statReducer from './Slices/statSlice'

const store = configureStore({
    reducer:{
     authstate:authReducer,
     courseState:courseReducer,
     paymentstate:razorpayReducer,
     lectureState:lecturesReducer,
     stat:statReducer
    },
    devTools:true
})

export default store;