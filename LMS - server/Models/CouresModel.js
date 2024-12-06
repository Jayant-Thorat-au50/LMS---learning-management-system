import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  catagory: {
    type: String,
    required: [true, "catagory title is reqiuired"],
    trim: true,
  },
  title: {
    type: String,
    required: [true, "course title is reqiuired"],
    trim: true,
    minLength: [8, "title should be at least 8 characters"],
    maxLength: [50, "title should not be  more than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "course description is reqiuired"],
    trim: true,
    minLength: [20, "description must be at least 8 characters"],
    maxLength: [200, "description must not be more than 50 characters"],
  },
  thumbnail: {
    public_id: { type: String },
    secure_Url: { type: String },
    required: [true, "course thumbnail is reqiuired"],
  },
  price: {
    type: Number,
  },
  noOfLectures: {
    type: Number,
    default:0
  },
  lectures: [
    {
      title: { type: String },
      description: { type: String },
      thumbnail: {
        public_id: {
          type: String,
          required: true,
        },
        secure_Url: {
          type: String,
          required: true,
        },
      },
    },
  ],
  createdby:{
    type:String,
    required:true
  },
  timestamps:true
});

// creating the course model with schema declared above and new collection 'course
CourseModel = model("course", courseSchema, "course");

export default CourseModel;