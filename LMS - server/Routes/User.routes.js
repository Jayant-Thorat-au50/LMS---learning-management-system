import express from 'express'
import {signUp,login, getUser} from '../Controller/user.controller.js'
import { isLoggedIn } from '../Middlewares/isLoggedIn.js';
import upload from '../Middlewares/multer.middleware.js';

const UserRoutes = express.Router();

UserRoutes.post('/register',upload.single("avatar"), signUp )

UserRoutes.post('/login', login )

UserRoutes.get('/me',isLoggedIn, getUser )

export default UserRoutes;