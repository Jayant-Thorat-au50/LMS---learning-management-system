
const express = require ('express')
const {addCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse, addLecture, deleteLecture} = require('../Controller/courseController.js')
 const {isLoggedIn} = require('../middlewares/auth.middleware.js')
const {authorizeRoles} = require('../middlewares/auth.middleware.js')
const {upload} = require('../middlewares/multer.middleware.js');


const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses)

courseRoutes.post('/add-course',isLoggedIn, upload.single('thumbnail'), addCourse)

courseRoutes.get('/get-one-course/:id', getOneCourse)

courseRoutes.put('/update-course/:id',isLoggedIn,authorizeRoles('ADMIN'), updateCourse)

courseRoutes.delete('/delete-course/:id',isLoggedIn, deleteCourse)

courseRoutes.post('/add-lecture/:id',isLoggedIn, upload.single('lecture') , addLecture)

courseRoutes.delete('/delete-lecture/:Course_id/:Lecture_id',isLoggedIn, deleteLecture)




module.exports = courseRoutes;