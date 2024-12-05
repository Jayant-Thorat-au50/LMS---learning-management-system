import { Schema, model } from "mongoose";

const couresSchema = new Schema({

})

CourseModel = model('course', couresSchema, 'course');

export default CourseModel;