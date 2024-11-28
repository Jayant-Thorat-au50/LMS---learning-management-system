
import UserModel from "../Models/UserModel.js"
import AppError from "../Utils/AppError.utils.js";

const signUp = async (req,res, next) => {

   const {fullName, email, password} = req.body;

   if(!fullName || !email || !password){
    return next(new AppError('Every field ie required', 400))
   }
}

export default signUp; 