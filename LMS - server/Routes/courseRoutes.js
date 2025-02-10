
const express = require('express')
const {addCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse, addLecture, deleteLecture, edit_lecture} = require('../Controller/courseController.js')
 const {isLoggedIn} = require('../Middlewares/auth.middleware.js')
const {authorizeRoles} = require('../Middlewares/auth.middleware.js')
const {upload} = require('../Middlewares/multer.middleware.js');


const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses )

courseRoutes.post('/add-course',isLoggedIn, upload.single('thumbnail'), addCourse)

courseRoutes.get('/get-one-course/:id', getOneCourse)

courseRoutes.put('/update-course/:id',isLoggedIn,authorizeRoles('ADMIN'),upload.single('newThumbnail'), updateCourse)

courseRoutes.put('/edit-lecture/:courseId',isLoggedIn,authorizeRoles('ADMIN'),upload.single('lecture'), edit_lecture)

courseRoutes.delete('/delete-course/:id',isLoggedIn, deleteCourse)

courseRoutes.post('/add-lecture/:id',isLoggedIn, upload.single('lecture') , addLecture)

courseRoutes.delete('/delete-lecture/:Course_id/:Lecture_id',isLoggedIn, deleteLecture)




module.exports = courseRoutes;