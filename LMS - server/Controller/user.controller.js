import UserModel from "../Models/UserModel.js";
import AppError from "../Utils/AppError.utils.js";
import emailValidate from "email-validator";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import fs from "fs";
import sendEmail from "../Utils/sendEmail.js";
import crypto from "crypto";

const cookieOption = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
};

const signUp = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // validating the extracted fields

  if (!fullName || !email || !password) {
    return next(new AppError("Every field ie required", 400));
  }

  try {
    const emailValid = emailValidate.validate(email);

    if (!emailValid) {
      return next(new AppError("invalid email address", 400));
    }

    const duplicateUser = await UserModel.findOne({ email });

    if (duplicateUser) {
      return next(new AppError("User with this email already exists", 400));
    }

    const User = await UserModel.create({
      fullName,
      email,
      password,
      avatar: {
        publicid: email,
        secure: "",
      },
    });

    if (!User) {
      return next(new AppError("User registration failed", 400));
    }

    console.log("file > ", JSON.stringify(req.file));

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          User.avatar.publicid = result.public_id;
          User.avatar.secureUrl = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(new AppError("file not uploaded, please try again", 500));
      }
    }

    await User.save();

    User.password = undefined;

    const token = await User.JwtToken();

    res.cookie("token", token, cookieOption);

    return res.status(200).json({
      success: true,
      message: "registered successfully",
      User,
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Every field is required", 400));
  }

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Invalid email or password", 400));
    }

    const token = await user.JwtToken();

    res.cookie("Token", token, cookieOption);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
const getUser = async (req, res, next) => {
  const userid = req.user.id;

  try {
    const User = await UserModel.findById(userid);

    res.status(200).json({
      success: true,
      data: User,
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const logout = (req, res) => {
  try {
    res.cookie("token", null, {
      maxAge: 0,
      secure: true,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  // validating the extracted fields
  if (!email) {
    next(new AppError("email is required", 400));
  }

  // validating the email
  const user = await UserModel.findOne({ email });

  if (!user) {
    next(new AppError("user with this email does not exist", 400));
  }

  // generating reset password token inside the user obj as per the userSchema
  const resetToken = await user.generateResetPasswordToken();

  // saving the user obj with added token
  await user.save();

  // to send the email with reset link to the user
  // here is the link generated with frontend url
  const resetUrl = `http://localhost:6070/reset-password/${resetToken}`;

  try {
    // sendemail utility args
    const subject = "reset password";
    const message = `click here <a href=${resetUrl}> to reset your password`;
    // sending email to email entered
    await sendEmail(email, subject, message);

    // responding user that email sent to the email id
    res.status(200).json({
      success: true,
      message: "an email is sent to your registered email id",
    });
  } catch (error) {
    // if error occurs the token set to the user obj will be disabled
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

    await user.save();
    next(new AppError(error.message, 400));
  }
};

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
    user.save();

    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  // validating extracted fields
  if (!oldPassword || !newPassword) {
    next(new AppError("please enter both old password and new password"), 400);
  }

  // getting user id from jwt auth
  const userId = req.user.id;

  try {
    const user = await UserModel.findById(userId).select("+password");

    // validating the the old password with the user obj
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      next(new AppError("invalid old password", 400));
    }

    // assigning the new password to the user obj
    user.password = newPassword;
    await user.save();

    // removing the password server's user instance
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "password changed successfully",
    });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export {
  signUp,
  login,
  getUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
};
