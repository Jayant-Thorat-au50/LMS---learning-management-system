import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name is required"],
      minLength: [5, "name must be atleast 5 characters"],
      maxLength: [50, "name should be less than characters"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      // trim:true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "password must be at least 8 characters"],
      select: false,
    },
    avatar: {
      publicid: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    subscription: {
      id: {
        type: String,
      },
      status: {
        type: String,
 
        default: "Pending",
      },
    },
    forgetPasswordToken: { type: String },
    forgetPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods = {
  JwtToken() {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
        subscription: this.subscription,
        role: this.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  },
  generateResetPasswordToken: async function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.forgetPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetToken;
  },
};

const UserModel = model("user", userSchema, "user");

export default UserModel;
