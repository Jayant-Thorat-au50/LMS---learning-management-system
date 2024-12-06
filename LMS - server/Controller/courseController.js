import CourseModel from "../Models/CouresModel";
import AppError from "../Utils/AppError.utils";

const addCourse = async (req, res, next) => {
  const { catagory, title, description, thumbnail, createdby } = req.body;

  if (!catagory || !title || !description || !thumbnail || !createdby) {
    next(new AppError("Every field is required", 400));
  }

  const Course = await CourseModel.craete({
    catagory,
    title,
    description,
    thumbnail,
    createdby,
  });

  if (!Course) {
    return next(
      new AppError("could not create new course, please try again", 500)
    );
  }

  await Course.save();

  res.status(200).json({
    success: true,
    message: "Course created successfully",
    Course,
  });
};

const getAllCourses = async () => {};
