import express from 'express'
import signUp from '../Controller/user.controller.js'

const UserRoutes = express.Router();

UserRoutes.post('/register', signUp )

export default UserRoutes;