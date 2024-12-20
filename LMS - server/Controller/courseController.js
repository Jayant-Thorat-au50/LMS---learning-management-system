import CourseModel from "../Models/CouresModel.js";
import AppError from "../Utils/AppError.utils.js";

const addCourse = async (req, res, next) => {
  // validating the extracted fields
  const { catagory, title, description, thumbnail, createdby } = req.body;

  try {
    if (!catagory || !title || !description || !createdby) {
      return next(new AppError("Every field is required", 400));
    }

    const duplicateTitle = await CourseModel.findOne({ title });

    if (duplicateTitle) {
      return next(
        new AppError(
          "course with this title already exists, please try with another name",
          400
        )
      );
    }

    // creating the course instance
    const Course = await CourseModel.create({
      catagory,
      title,
      description,
      thumbnail,
      createdby,
    });

    // if server fails to create the course instance
    if (!Course) {
      return next(
        new AppError("could not create new course, please try again", 500)
      );
    }

    // saving the course obj
    await Course.save();

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      Course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const coursesList = await CourseModel.find({});

    return res.status(200).json({
      success: true,
      noofCourses: coursesList.length,
      coursesList,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getOneCourse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const Course = await CourseModel.findById(id);

    if (!Course) {
      return next(
        new AppError("failed to load the course, please trye again", 400)
      );
    }

    res.status(200).json({
      success: false,
      message: "Course details fetched successfully",
      Course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const updateCourse = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await CourseModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(
        new AppError("unable to update the course, please try again", 400)
      );
    }

    return res.status(200).json({
      success: true,
      message: "course updated successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const deleteCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await CourseModel.findById(id);

    if (!course) {
      return next(new AppError("course does not exists", 400));
    }

    await CourseModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "course deleted successfully",
    });
  } catch (error) {
    return next(new AppError(e.message, 400));
  }
};

const addLecture = async (req, res, next) => {

  const {id} = req.params
  const {title, description } = req.body;

  try {
    if (!title || !description) {
      return next(new AppError("Every field is required", 400));
    }

  // creating a lec instance

    const lecture = {
      title: title,
      description: description,
    };


    if (!lecture) {
      return next(new AppError("failed to add the lecture, please try again",400));
    }

    const course = await CourseModel.findById(id)
 
  // validation for the duplicate title

  let duplicateTitle;

    course.lectures.forEach(lecture =>{ 
      if(lecture.title === title) duplicateTitle = true;
    })

    if(duplicateTitle){
      return next(new AppError("lecture with the same title already exists, please try with another title",400));
    }
  
  // let's push this lec obj in the lectures array in course obj
    course.lectures.push(lecture);
    course.noOfLectures = course.lectures.length
  
  // save the course
    await course.save();

    return res.status(200).json({

      success:true,
      message:'lecture added successfully',
      course
    })
    
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteLecture = async (req,res, next) => {
     const {Course_id, Lecture_id} = req.params;

  try {
    if(!Course_id || !Lecture_id){
      return next(new AppError('request failed, please try again', 500));
     }

  // getting the course of the lecture to be deleted
     const course = await CourseModel.findById(Course_id);

     if(!course){
      return next(new AppError('course does not exists, please try again', 500));
     }

    
  // the lecture to be deleted is
     let LectureToBeDeleted;
  
  // lets get the lecture to be deleted if exists
     course.lectures.forEach(lecture => {
       if(lecture.id === Lecture_id){
        return LectureToBeDeleted = lecture
       }
     });

  // lets delete the lecture if exists
     if(LectureToBeDeleted){
      course.lectures.splice(course.lectures.indexOf(LectureToBeDeleted), 1)
      course.noOfLectures = course.lectures.length
     }else{
      return next(new AppError('lecture requested does not exists', 400))
     }
  
  // save the course obj
     await course.save();

    return res.status(200).json({
      success:true,
      message:'',
      course
     })
  } catch (error) {
    return next(new AppError(error.message, 400))
  }
}
export { addCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse, addLecture, deleteLecture };
