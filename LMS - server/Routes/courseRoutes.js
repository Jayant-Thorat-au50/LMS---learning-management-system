
import express from 'express'
import { addCourse, getAllCourses, getOneCourse } from '../Controller/courseController.js';
import { isLoggedIn } from '../Middlewares/isLoggedIn.js';

const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses)

courseRoutes.post('/add-course',isLoggedIn, addCourse)

courseRoutes.get('/get-one-course/:id',isLoggedIn, getOneCourse)



export default courseRoutes