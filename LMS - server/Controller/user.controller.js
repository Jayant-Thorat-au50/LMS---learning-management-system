import UserModel from "../Models/UserModel.js";
import AppError from "../Utils/AppError.utils.js";
import emailValidate from "email-validator";
import bcrypt from "bcrypt";

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
        public_id: email,
        secure: "",
      },
    });

    if (!User) {
      return next(new AppError("User registration failed", 400));
    }

    await User.save();

    User.password = undefined;

    const token = await User.JwtToken();

    res.cookie("token", token, cookieOption);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
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

    res.cookie("token", token, cookieOption);

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
    
    const userId = req.user.userId

try {
  const user = await UserModel.findById(userId);

  res.status(200).json({
    success:true,
    user
  })
} catch (error) {
  next(new AppError(error.message, 400))
}
  }

export { signUp, login, getUser };
