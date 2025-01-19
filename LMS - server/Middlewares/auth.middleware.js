import jwt from "jsonwebtoken";

import AppError from '../Utils/AppError.utils.js'
import UserModel from "../Models/UserModel.js";


export const isLoggedIn = async (req, _res, next) => {
  // extracting token from the cookies
  const { token } = req.cookies;

  // If no token send unauthorized message
  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decode send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.user = decoded;

  // Do not forget to call the next other wise the flow of execution will not be passed further
  next();
};

// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  };

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = async (req, _res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  if (req.user.role !== "ADMIN" && req.user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
};

export const isPremiumMember = async (req,res, next) => {

  const {userId} = req.params;

  const user = await UserModel.findById(userId);
  console.log(user);
  

  if(!user){
    return next(new AppError('Unauthorized user please login to continue'));
  };

  if(user.subscription.status === "Active"){
    return next(new AppError('already a subscriber'))
  }else{
    next();
  } 
}