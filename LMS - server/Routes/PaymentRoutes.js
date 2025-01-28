const express = require ('express')
const {getRazorpayApiKey, buySubscription,verifySubscription, cancelSubscription, getAllPayments} = require("../Controller/PaymentController.js");
const {isPremiumMember, isLoggedIn} = require ('../middlewares/auth.middleware.js')


const paymentRoutes = express.Router()

paymentRoutes.get("/razorpay_ApiKey", isLoggedIn, getRazorpayApiKey);

paymentRoutes.get("/subscribe/:userId",isLoggedIn,isPremiumMember, buySubscription);

paymentRoutes.post("/verify-subscription/:id",isLoggedIn, verifySubscription);

paymentRoutes.post("/unsubscribe/:id",isLoggedIn, cancelSubscription);

paymentRoutes.get("/allPayments",isLoggedIn, getAllPayments);

module.exports = paymentRoutes;
