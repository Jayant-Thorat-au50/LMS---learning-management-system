
import express from 'express'
import { addCourse, addLecture, deleteCourse, deleteLecture, getAllCourses, getOneCourse, updateCourse } from '../Controller/courseController.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js'
import { authorizeRoles } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js';


const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses)

courseRoutes.post('/add-course', upload.single('thumbnail'), addCourse)


courseRoutes.get('/get-one-course/:id',isLoggedIn, getOneCourse)

courseRoutes.put('/update-course/:id',isLoggedIn,authorizeRoles('ADMIN'), updateCourse)

courseRoutes.delete('/delete-course/:id',isLoggedIn,authorizeRoles('ADMIN'), deleteCourse)

courseRoutes.post('/add-lecture/:id',isLoggedIn,authorizeRoles('ADMIN'), addLecture)

courseRoutes.delete('/delete-lecture/:Course_id/:Lecture_id',isLoggedIn,authorizeRoles('ADMIN'), deleteLecture)





export default courseRoutes