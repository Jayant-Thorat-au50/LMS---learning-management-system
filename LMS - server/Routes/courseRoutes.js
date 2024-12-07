
import express from 'express'
import { addCourse, deleteCourse, getAllCourses, getOneCourse, updateCourse } from '../Controller/courseController.js';
import { isLoggedIn } from '../Middlewares/isLoggedIn.js';
import { authorizedRoles } from '../Middlewares/authorizedRoles.js';


const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses)

courseRoutes.post('/add-course',isLoggedIn,authorizedRoles('ADMIN'), addCourse)

courseRoutes.get('/get-one-course/:id',isLoggedIn, getOneCourse)

courseRoutes.put('/update-course/:id',isLoggedIn,authorizedRoles('ADMIN'), updateCourse)

courseRoutes.delete('/delete-course/:id',isLoggedIn,authorizedRoles('ADMIN'), deleteCourse)



export default courseRoutes