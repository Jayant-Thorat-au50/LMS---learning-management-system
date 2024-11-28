
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullName:{
        type:{String},
        required:[true, 'full name is required'],
        minLength:[5, 'name must be atleast 5 characters'],
        maxLength:[50,'name should be less than characters'],
        lowercase:true,
        trim:true
    },
    email:{
        type:{String},
        required:[true, 'Email is required'],
        lowercase:true,
        trim:true,
        unique:true
    },
    password:{
        type:{String},
        required:[true, 'Password is required'],
        minLength:[8, 'password must be at least 8 characters'],
        select:false
    },
    avatar:{
        publicid : {
            type:{String}
        },
        secureUrl:{
            type:{String}
        }
    },
    role:{
        type:{String},
        enum:['USER', 'ADMIN'],
        default:'USER'
    },
    forgetPasswordToken:{type:String},
    forgetPasswordExpiry:Date,
},{
    timestamps:true
    
});

const UserModel = model('user', userSchema, 'user')

export default UserModel;