
import express from 'express'

const courseRoutes = express.Router();

courseRoutes.get('/', getListAllCourses)

courseRoutes.post('/add-course', addCourse)

export default courseRoutes