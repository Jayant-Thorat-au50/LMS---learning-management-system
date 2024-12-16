
import express from 'express'
import { addCourse, addLecture, deleteCourse, deleteLecture, getAllCourses, getOneCourse, updateCourse } from '../Controller/courseController.js';
import { isLoggedIn } from '../Middlewares/isLoggedIn.js';
import { authorizedRoles } from '../Middlewares/authorizedRoles.js';


const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses)

courseRoutes.post('/add-course',isLoggedIn,authorizedRoles('ADMIN'), addCourse)

courseRoutes.get('/get-one-course/:id',isLoggedIn, getOneCourse)

courseRoutes.put('/update-course/:id',isLoggedIn,authorizedRoles('ADMIN'), updateCourse)

courseRoutes.delete('/delete-course/:id',isLoggedIn,authorizedRoles('ADMIN'), deleteCourse)

courseRoutes.post('/add-lecture/:id',isLoggedIn,authorizedRoles('ADMIN'), addLecture)

courseRoutes.delete('/delete-lecture/:Course_id/:Lecture_id',isLoggedIn,authorizedRoles('ADMIN'), deleteLecture)





export default courseRoutes