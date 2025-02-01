const express = require("express");

const {
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
  filterUsers,
} = require("../Controller/user.controller.js");
const {isLoggedIn} = require("../middlewares/auth.middleware.js");
const { upload } = require("../middlewares/multer.middleware.js");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("Avatar"), signUp);

UserRoutes.post("/login", login);

UserRoutes.get("/me/:userId",isLoggedIn, getUser);

UserRoutes.get("/getAllUserData",isLoggedIn, getAllUserData);

UserRoutes.get("/logout/:userId", logout);

UserRoutes.get("/get", (req, res) => res.send("ok"));

UserRoutes.post("/forgotPassword", forgotPassword);

UserRoutes.post("/reset-password/:resetToken", resetPassword);

UserRoutes.post("/change-password/:userId", isLoggedIn, changePassword);

UserRoutes.put("/user-update/:userId",isLoggedIn, upload.single("avatar"), userUpdate);

UserRoutes.delete("/remove-user/:userId",isLoggedIn, deleteUser);

UserRoutes.post("/filter-users",isLoggedIn, filterUsers);

module.exports = UserRoutes;
