const express = require ('express')
const {getRazorpayApiKey, buySubscription,verifySubscription, cancelSubscription, getAllPayments} = require("../Controller/PaymentController.js");
const {isPremiumMember} = require ('../middlewares/auth.middleware.js')


const paymentRoutes = express.Router()

paymentRoutes.get("/razorpay_ApiKey", getRazorpayApiKey);

paymentRoutes.get("/subscribe/:userId",isPremiumMember, buySubscription);

paymentRoutes.post("/verify-subscription/:id", verifySubscription);

paymentRoutes.post("/unsubscribe/:id", cancelSubscription);

paymentRoutes.get("/allPayments", (req, res) => res.send('kkkkkk'));

module.exports = paymentRoutes;
