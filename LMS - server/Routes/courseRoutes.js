
import express from 'express'
import { addCourse, deleteCourse, getAllCourses, getOneCourse, updateCourse } from '../Controller/courseController.js';
import { isLoggedIn } from '../Middlewares/isLoggedIn.js';

const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses)

courseRoutes.post('/add-course',isLoggedIn, addCourse)

courseRoutes.get('/get-one-course/:id',isLoggedIn, getOneCourse)

courseRoutes.put('/update-course/:id',isLoggedIn, updateCourse)

courseRoutes.post('/delete-course/:id',isLoggedIn, deleteCourse)



export default courseRoutes