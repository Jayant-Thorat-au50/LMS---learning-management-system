import express from 'express'
import {signUp,login, getUser} from '../Controller/user.controller.js'
import { isLoggedIn } from '../Middlewares/isLoggedIn.js';

const UserRoutes = express.Router();

UserRoutes.post('/register', signUp )

UserRoutes.post('/login', login )

UserRoutes.get('/me',isLoggedIn, getUser )

export default UserRoutes;