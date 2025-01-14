import express from 'express'
import {signUp,login, getUser,logout, forgotPassword, resetPassword, changePassword,userUpdate} from '../Controller/user.controller.js'
import { isLoggedIn } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js'

const UserRoutes = express.Router();

UserRoutes.post('/register',upload.single('Avatar'),signUp);

UserRoutes.post('/login', login )

UserRoutes.get('/me/:userId', getUser )

UserRoutes.get('/logout',logout )

UserRoutes.get('/get',(req,res)=> res.send('ok') )

UserRoutes.post('/forgotPassword',forgotPassword)

UserRoutes.post('/reset-password/:resetToken',resetPassword)

UserRoutes.post('/change-password',isLoggedIn,changePassword)

UserRoutes.put('/user-update/:userId', upload.single('avatar'), userUpdate)

export default UserRoutes;