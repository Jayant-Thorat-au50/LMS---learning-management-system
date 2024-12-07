import AppError from "../Utils/AppError.utils.js";


const authorizedRoles = (...roles) =>  async (req,res, next) => {

    const currentUserRole = req.user.role
    if(roles.includes(currentUserRole)){
      return next();
    }else {
      return next(new AppError('your are not authorized to access this route'))
    }
  }

  export  {authorizedRoles}