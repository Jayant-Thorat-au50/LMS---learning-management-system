
// model imports
const UserModel = require("../Models/UserModel.js");
const CourseModel = require('../Models/CouresModel.js')

// lib (pacakge) imports
const emailValidate = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// utils imports
const AppError = require("../Utils/AppError.utils.js");
const sendEmail = require("../Utils/sendEmail.js");

// module imports
const fs = require("fs/promises");

const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
};

// user sign up
const signUp = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // validating the extracted fields
  if (!fullName || !email || !password) {
    return next(new AppError("Every field ie required", 400));
  }
  try {
    // validating the email id
    const emailValid = emailValidate.validate(email);

    if (!emailValid) {
      return next(new AppError("invalid email address", 400));
    }

    // validating that this email id not already registered
    const duplicateUser = await UserModel.findOne({ email });

    if (duplicateUser) {
      return next(new AppError("User with this email already exists", 400));
    }

    // creating a user instance in the in collection
    // this user not yet saved
    const User = await UserModel.create({
      fullName,
      email,
      password,
      avatar: {
        publicid: email,
        secureUrl:
          "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      },
    });

    // for any reason user registration can fail
    if (!User) {
      return next(new AppError("User registration failed", 400));
    }

    // file sent by the multer by saving in the server
    if (req.file) {
      // sending this file to the cloudinary
      // to get the global resourse url
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms-user profiles",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        // assigning cloudinary url in the avatar url
        if (result) {
          User.avatar.publicid = result.public_id;
          User.avatar.secureUrl = result.secure_url;
          // removing the file saved from multer in the uploads folder
          fs.rm(`./uploads/${req.file.filename}`);
        }
      } catch (error) {
        const partiallyAddedUser = await UserModel.find({ email: email });
        if (partiallyAddedUser) {
          await UserModel.deleteOne({ email });
        }

        return next(
          new AppError(
            "file not uploaded, please try again",
            error.message,
            500
          )
        );
      }
    }

    // hiding the password
    
    // saving the userobj
    await User.save();

    // making password disappear when user obj sent to the client
    User.password = undefined;

    // getting token created in userSchema methods
    const token = await User.JwtToken();

    // setting cookies in the client side through the response
    // before sending the data to client
    res.cookie("token", token, cookieOption);

    // sending the saved user obj to the client
    return res.status(200).json({
      success: true,
      message: "registered successfully",
      User,
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
// user login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // validaing the extracted fields
  if (!email || !password) {
    return next(new AppError("Every field is required", 400));
  }

  try {
    // validaing the user's existence in the db
    const user = await UserModel.findOne({ email }).select("+password");

    // validaing the password with the user
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Invalid email or password", 400));
    }

    // setting token created in the userSchema method
    const token = await user.JwtToken();
    
    // setting cookies in the client side through the response
    res.cookie("Token", token, cookieOption);

    //saving authtoken in the db
    user.authToken = token;
     
    //saving the user
    await user.save();

    // making the passowrd disappear when the user obj is sent to the client
    user.password= undefined;

    // sending the user data to the client
    res.status(200).json({
      success: true,
      message: "User log in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// get user api
const getUser = async (req, res, next) => {
  // grabbing the id extracted from the token in jwt auth middleware
  const { userId } = req.params;

  console.log(req.user);
  

  try {
    const User = await UserModel.findById(userId);

    // sending the user data to the client
    res.status(200).json({
      success: true,
      User,
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

// user logout
const logout = async (req, res, next) => {
  try {

    const {userId} = req.params;

    const user = await UserModel.findById(userId)

    if(!user){
       return res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    }

    // deactivating the token existing at the client side
    res.cookie("Token", null, {
      maxAge: 0,
      secure: true,
      httpOnly: true,
    });

    // disable the cookie in the db
    user.authToken = undefined
    await user.save();

    // sending the response message
   return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

// forget passowrd for user
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // validating the extracted fields
  if (!email) {
    next(new AppError("email is required", 400));
  }

  try {
    // validating the email
    const user = await UserModel.findOne({ email });

    if (!user) {
     return next(new AppError("user with this email does not exist", 400));
    }

    // generating reset password token inside the user obj as per the userSchema
    const resetToken = await user.generateResetPasswordToken();

    // saving the user obj with added token
    await user.save();

    // to send the email with reset link to the user
    // here is the link generated with frontend url
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // sendemail utility args
    const subject = "reset password";
    const message = `<a href=${resetUrl}>Click Here</a>`;
    // sending email to email entered
    await sendEmail(email, subject, message);

    // responding user that email sent to the email id
    res.status(200).json({
      success: true,
      message: "an email is sent to your registered email id",
    });
  } catch (error) {
    // if error occurs the token set to the user obj will be disabled
    const user = await UserModel.findOne({ email });
    if(user){

      user.forgetPasswordToken = undefined;
      user.forgetPasswordExpiry = undefined;
      await user.save();
    }
    console.log(error);
    

   return next(new AppError(error.message, 400));
  }
};

// user reset password
const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { newPassword } = req.body;

  // validating extracted fields
  if (!newPassword) {
    next(new AppError("please enter new password", 400));
  }

  try {
    // creating encrypted form of the token received
    const forgetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // validating the token with user obj
    const user = await UserModel.findOne({
      forgetPasswordToken: forgetPasswordToken,
      forgetPasswordExpiry: { $gt: Date.now() },
    });

    // err if link is expired
    if (!user) {
      next(new AppError("link is invalid or expired", 400));
    }

    // updating the new password
    user.password = newPassword;

    // removing the token from user obj
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

    // saving the user obj
   await user.save();

     return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

// change password
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  console.log(req.user);
  

  // validating extracted fields
  if (!oldPassword || !newPassword) {
    next(new AppError("please enter both old password and new password"), 400);
  }

  // getting user id from jwt auth
  const {userId} = req.params

  try {
    const user = await UserModel.findById(userId).select("+password");

    // validating the the old password with the user obj
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      next(new AppError("Invalid old password", 400));
    }

    // assigning the new password to the user obj
    user.password = newPassword;
    await user.save();

    // sending the response message
    res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const userUpdate = async (req, res, next) => {
  const { fullName } = req.body;
  const { userId } = req.params;


  const userTobeUpdated = await UserModel.findById(userId);

  if (!userTobeUpdated) {
    return next(new AppError("Invalid user plaese try again", 400));
  }

// if the role is admin
// let's update the courses created by him

  if(userTobeUpdated.role === "ADMIN"){

        await CourseModel.updateMany(
          {createdby:userTobeUpdated.fullName} ,
          {$set:{createdby:fullName}, $inc:{points:1}}
        )
         userTobeUpdated.fullName = fullName;
  }else{
    userTobeUpdated.fullName = fullName
  }


// let's update the file profile stored in cloudinary
// by deleting the previous one

  if (req.file) {
    try {
      await cloudinary.v2.uploader.destroy(userTobeUpdated.avatar.publicid);

      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms-user profiles",
        height: 250,
        width: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        userTobeUpdated.avatar.publicid = result.public_id;
        userTobeUpdated.avatar.secureUrl = result.secure_url;
      }
      fs.rm(`./uploads/${req.file.filename}`);
    } catch (error) {
      return next(
        new AppError("failed to upload the image please try again", 500)
      );
    }
  }

  // save the user to be updated

  await userTobeUpdated.save();

  return res.status(200).json({
    success: true,
    data: userTobeUpdated,
    message: "User updated successfully",
  });
};

// getting the All user data
const getAllUserData = async (req, res, next) => {
  try {

  // fetching the entire users collection (array)
    const allUserCount = await UserModel.find({});

  // filtering the user's array for subscribed users
    const subscribedUsers = allUserCount.filter(
      (user) => user.subscription.status === "Active"
    );

    return res.status(200).json({
      success: true,
      message: "data of all users fetched successsfully",
      allUserCount,
      subscribedUsers,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

// delete the user by id
const deleteUser = async (req,res, next) => {

  const {userId} = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(userId);

    return res.status(200).json({
      success:true,
      message:'user deleted successfully',
      
    })
  } catch (error) {
    return next(new AppError(error.message), 400)
  }
}

//filter users by role abd subscription status
const filterUsers = async (req, res, next) => {

  try {
    console.log(req.body);
    
    const users = await UserModel.find(req.body)
    
    console.log(users);
    

     return res.status(200).json({
          success:true,
          users
      })
    } catch (error) {
      next(new AppError(error.message, 400))
    }
}

module.exports = {
  signUp,
  login,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  userUpdate,
  getAllUserData,
  deleteUser,
  filterUsers
};
