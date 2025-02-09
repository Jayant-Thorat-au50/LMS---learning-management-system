const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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
    minLength: [20, "description must be at least 20 characters"],
    maxLength: [200, "description must not be more than 50 characters"],
  },
  thumbnail: {
    public_id: {
       type: String ,
      default:'thumbnail'
      },
    secure_Url: { type: String },
  
  },
  price: {
    type: Number,
    default:0
  },
  noOfLectures: {
    type: Number,
    default:0
  },
  lectures: [
    {
      id:{type:Number},
      title: { type: String },
      description: { type: String },
      lectureSrc: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      }
    },
  ],
  createdby:{
    type:String,
    required:true
  },
 
},{
  timestamps:true
});

// creating the course model with schema declared above and new collection 'course
const CourseModel = mongoose.model("course", courseSchema, "course");

module.exports = CourseModel
