import { Schema, model } from "mongoose";

const couresSchema = new Schema({
title:{
    type:String,
    require:[true, 'course title is reqiuired'],
    trim:true,
    minLength:[8, 'title should be at least 8 characters'],
    maxLength:[50, 'title should not be  more than 50 characters'],
}
})

// creating the course model with schema declared above and new collection 'course
CourseModel = model('course', couresSchema, 'course');

export default CourseModel;