import UserModel from "../Models/UserModel.js";
import AppError from "../Utils/AppError.utils.js";
import emailValidate from "email-validator";

const signUp = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // validating the extracted fields
  if (!fullName || !email || !password) {
    return next(new AppError("Every field ie required", 400));
  }

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
      public_id: email,
      secure: "",
    },
  });

  if (!User) {
    return next(new AppError("User registration failed",400));
  }

 

  await User.save();

  User.password= undefined

  const token = await User.JwtToken();

  const cookieOption = {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  res.cookie("token", token, cookieOption);

  return res.status(200).json({
    success: true,
    message: "User registered successfully",
    User,
  });
};

export default signUp;
