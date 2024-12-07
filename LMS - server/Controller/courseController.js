import CourseModel from "../Models/CouresModel.js";
import AppError from "../Utils/AppError.utils.js";

const addCourse = async (req, res, next) => {
  // validating the extracted fields
  const { catagory, title, description, thumbnail, createdby } = req.body;

  try {
    if (!catagory || !title || !description || !createdby) {
      return next(new AppError("Every field is required", 400));
    }

    const duplicateTitle = await CourseModel.findOne({ title});

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

const getAllCourses = async (req,res, next) => {

try {
  const coursesList = await CourseModel.find({});

 return res.status(200).json({
    success:true,
    noofCourses:coursesList.length,
    coursesList
  })
} catch (error) {
  return next(new AppError(error.message, 500))
}

};

const getOneCourse = async (req,res, next) => {
 
  const {id} = req.params

try {
  const Course = await CourseModel.findById(id);

  if(!Course){
    return next(new AppError('failed to load the course, please trye again', 400))
  }

  res.status(200).json({
    success:false,
    message:'Course details fetched successfully',
    Course
  });
} catch (error) {
  return next(new AppError(error.message, 400))
}
}

const updateCourse = async (req,res) => {

  const {id} = req.params;

try {
  const course = await CourseModel.findByIdAndDelete(
    id,
    {
      $set:req.body
    },
    {
      runValidators:true
    }
  )

  if(!course){
    return next(new AppError('unable to update the course, please try again',400))
  }

  return res.status(200).json({
    success:true,
    message:'course updated successfully',
    course
  })
} catch (error) {
   return next(new AppError(error.message, 400))
}


}

export { addCourse, getAllCourses, getOneCourse, updateCourse };
