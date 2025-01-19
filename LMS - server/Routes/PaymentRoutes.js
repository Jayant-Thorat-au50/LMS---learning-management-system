import { Router } from "express";
import { buySubscription, cancelSubscription, getAllPayments, getRazorpayApiKey, verifySubscription } from "../Controller/PaymentController.js";
import { isPremiumMember } from "../middlewares/auth.middleware.js";


const paymentRoutes = Router();

paymentRoutes.get("/razorpay_ApiKey", getRazorpayApiKey);

paymentRoutes.get("/subscribe/:userId",isPremiumMember, buySubscription);

paymentRoutes.post("/verify-subscription/:id", verifySubscription);

paymentRoutes.post("unsubscribe", cancelSubscription);

paymentRoutes.get("allPayments", getAllPayments);

export default paymentRoutes;
