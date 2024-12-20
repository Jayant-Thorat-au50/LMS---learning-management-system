import express from 'express'
import {signUp,login, getUser,logout, forgotPassword, resetPassword, changePassword} from '../Controller/user.controller.js'
import { isLoggedIn } from '../Middlewares/isLoggedIn.js';
import upload from '../Middlewares/multer.middleware.js';



const UserRoutes = express.Router();

UserRoutes.post('/register',signUp);

UserRoutes.post('/login', login )

UserRoutes.get('/me',isLoggedIn, getUser )

UserRoutes.get('/logout',logout )

UserRoutes.get('/get',(req,res)=> res.send('ok') )

UserRoutes.post('/forgotPassword',forgotPassword)

UserRoutes.post('/reset-password/:resetToken',resetPassword)

UserRoutes.post('/change-password',isLoggedIn,changePassword)

export default UserRoutes;