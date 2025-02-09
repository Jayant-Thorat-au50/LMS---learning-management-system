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
  becomeAdmin,
  requestList,
  aprooveAdmin,
  rejectAdminReq,
} = require("../Controller/user.controller.js");
const {isLoggedIn} = require("../Middlewares/auth.middleware.js");
const { upload } = require("../Middlewares/multer.middleware.js");
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

UserRoutes.get("/become-admin/:userId",isLoggedIn, becomeAdmin);

UserRoutes.get("/requestList",isLoggedIn, requestList);

UserRoutes.post("/aprooveAdmin",isLoggedIn, aprooveAdmin);

UserRoutes.post("/rejectAdminReq",isLoggedIn, rejectAdminReq);

module.exports = UserRoutes;
