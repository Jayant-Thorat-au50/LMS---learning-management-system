import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/Authslice'

const store = configureStore({
    reducer:{
     authstate:authReducer
    },
    devTools:true
})

export default store;