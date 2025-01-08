import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/Authslice'
import courseReducer from './Slices/courseSlice'

const store = configureStore({
    reducer:{
     authstate:authReducer,
     courseState:courseReducer,
    },
    devTools:true
})

export default store;