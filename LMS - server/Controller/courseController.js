
const CourseModel = require("../Models/CouresModel.js");
const AppError = require("../Utils/AppError.utils.js");
const cloudinary = require("cloudinary");
const fs = require("fs/promises");

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
      thumbnail: {
        public_id: " ",
        secure_Url:
          "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      },
      createdby,
    });

    // if server fails to create the course instance
    if (!Course) {
      return next(
        new AppError("could not create new course, please try again", 500)
      );
    }

    if (req.file) {
      try {
        const response = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });

        if (response) {
          (Course.thumbnail.public_id = response.public_id),
            (Course.thumbnail.secure_Url = response.secure_url);
        }

        fs.rm(`./uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError(error.message, 500));
      }
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
      message: "All available courses fetched ",
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

    Course.noOfLectures = Course.lectures.length;
    await Course.save();

    res.status(200).json({
      success: true,
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

  const course = await CourseModel.findById(id);
   if(!course){
    return next(new AppError('course does not exists', 400))
   }

  if(req.file){
    try {
      await cloudinary.v2.uploader.destroy(course.thumbnail.public_id)

      const result = await cloudinary.v2.uploader.upload(req.file.path , {
        folder: "lms",

      })

      const newThumb = {
        secure_Url:result.secure_url,
        public_id:result.public_id,
      }

      req.body.thumbnail = newThumb
      console.log(req.body);
      

      if(result){
        const course = await CourseModel.findByIdAndUpdate(
          id,
          {
            $set: req.body,
          },
          {
            runValidators: true,
          }
        );
        console.log(course);
        } 

        
      }
        catch (error) {
          return next(new AppError(error.message, 400));
        }
  }else{
    const course = await CourseModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );
  }

    if (!course) {
      return next(
        new AppError("unable to update the course, please try again", 400)
      );
    }

    const updatedCourse = await CourseModel.findById(id)

    return res.status(200).json({
      success: true,
      message: "course updated successfully",
      updatedCourse,
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
    return next(new AppError(error.message, 400));
  }
};

const addLecture = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    // validating the xtracted fields
    if (!title || !description) {
      return next(new AppError("Every field is required", 400));
    }

    // creating a lec instance

    const lecture = {
      id: "",
      title: title,
      description: description,
      lectureSrc: {
        public_id: "",
        secure_url: "",
      },
    };

    if (!lecture) {
      return next(
        new AppError("failed to add the lecture, please try again", 400)
      );
    }

    const course = await CourseModel.findById(id);

    //validating the course

    if (!course) {
      return next(new AppError("course does not exists"));
    }

    // validation for the duplicate title
    let duplicateTitle;

    course.lectures.forEach((lecture) => {
      if (lecture.title === title) duplicateTitle = true;
    });

    if (duplicateTitle) {
      return next(
        new AppError(
          "lecture with the same title already exists, please try with another title",
          400
        )
      );
    }

    // let's upload the lecture video to cloudinary "lms-lecture-videos" folder
    if (req.file) {
      console.log(course.lectures.length);

      try {
        const uploadedVideo = await cloudinary.v2.uploader.upload(
          req.file.path,
          {
            folder: "lms-lecture-videos",
            chunk_size: 50000000 ,
            resource_type: "video",
          }
        );
        if (uploadedVideo) {
          (lecture.id = course.lectures.length + 1),
            (lecture.lectureSrc.public_id = uploadedVideo.public_id),
            (lecture.lectureSrc.secure_url = uploadedVideo.secure_url);
        }

        fs.rm(`./uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError("failed to upload the video", 500));
      }
    }

    // let's push this lec obj in the lectures array in course obj
    course.lectures.push(lecture);
    course.noOfLectures = course.lectures.length;

    // save the course obj
    await course.save();

    return res.status(200).json({
      success: true,
      message: "lecture added successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteLecture = async (req, res, next) => {
  const { Course_id, Lecture_id } = req.params;

  try {
    if (!Course_id || !Lecture_id) {
      return next(new AppError("request failed, please try again", 500));
    }

    // getting the course of the lecture to be deleted
    const course = await CourseModel.findById(Course_id);

    if (!course) {
      return next(
        new AppError("course does not exists, please try again", 500)
      );
    }

    // the lecture to be deleted is
    let LectureToBeDeleted;

    // lets get the lecture to be deleted if exists
    course.lectures.forEach((lecture) => {
      if (lecture._id == Lecture_id) {
        return (LectureToBeDeleted = lecture);
      }
    });

    console.log(LectureToBeDeleted);

    // lets delete the lecture if exists
    if (LectureToBeDeleted) {
      await cloudinary.v2.uploader.destroy(
        LectureToBeDeleted.lectureSrc.public_id,
        { resource_type: "video" }
      );
      course.lectures.splice(course.lectures.indexOf(LectureToBeDeleted), 1);
      course.noOfLectures = course.lectures.length;
    } else {
      return next(new AppError("lecture requested does not exists", 400));
    }

    // save the course obj
    await course.save();

    return res.status(200).json({
      success: true,
      message: "lecture deleted successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

const edit_lecture = async (req, res, next) => {
  const { courseId } = req.params;

  const { lecture_id, title, description } = req.body;
  console.log(lecture_id, title, description);

  try {
    const course = await CourseModel.findById(courseId);

    const LectureToBeEdited = course.lectures.filter(
      (l) => l._id == lecture_id
    );

    if (req.file) {
      console.log(req.file);
      try {
        await cloudinary.v2.uploader.destroy(
          LectureToBeEdited[0].lectureSrc.public_id
        );

        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms-lecture-videos",
          chunk_size: 500000000,
          resource_type: "video",
        });

        if (result) {
          console.log(result);
          
          const update = await CourseModel.updateOne(
            { _id: courseId, "lectures._id": lecture_id },
            {
              $set: {
                "lectures.$.description": description,
                "lectures.$.title": title,
                "lectures.$.lectureSrc.secure_url": result.secure_url,
                "lectures.$.lectureSrc.public_id": result.public_id,
              },
            }
          );
          console.log(update);
        }
        fs.rm(`./uploads/${req.file.filename}`);
      } catch (error) {
        return next(new AppError(error.message, 400));
      }
    } else {
      const update = await CourseModel.updateOne(
        { _id: courseId, "lectures._id": lecture_id },
        { $set: { "lectures.$.title": title } },
        { $set: { "lectures.$.description": description } }
      );
      console.log(update);
    }

    return res.status(200).json({
      success: true,
      message: "lecture updated successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

module.exports = {
  addCourse,
  getAllCourses,
  getOneCourse,
  updateCourse,
  deleteCourse,
  addLecture,
  deleteLecture,
  edit_lecture,
};
