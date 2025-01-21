const PaymentModel = require("../Models/PaymentModule.js");
const AppError = require("../Utils/AppError.utils.js");
const Razorpay = require("razorpay");
const UserModel = require("../Models/UserModel.js");
const crypto = require("crypto");

const key_id = "rzp_test_nVbvUISEyz14Qf";
const key_secret = "7DsWX1XnQd1yHxf4SLksFXOm";

const razorpay = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});

const getRazorpayApiKey = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "razorpay api key",
    razorpayApiKey: key_id,
  });
};
const buySubscription = async (req, res, next) => {
  const { userId } = req.params;

  // validate user

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(new AppError("Unauthorized user please login", 500));
  }

  //   // throw error if the user is admin
  if (user.role === "ADMIN") {
    return next(new AppError("Admin cannot purchase a subscription", 400));
  }

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_PkOhdRnu6SYkPq",
      customer_notify: 1,
      total_count: 12,
    });
    user.subscription.id = subscription.id;
    user.subscription.status = " ";

    //     // saving the user obj

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User subscribed successfully",
      subscription_Id: user.subscription.id,
    });
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
const verifySubscription = async (req, res, next) => {
  const { id } = req.params;

  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;

  console.log(req.body);

  const user = await UserModel.findById(id);
  console.log(user);

  try {
    if (!user) {
      return next(new AppError("unauthorized please login", 400));
    }

    const subscription_id = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${razorpay_payment_id}|${subscription_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("payment not verified please try again", 500));
    }

    await PaymentModel.create({
      razorpay_payment_id: razorpay_payment_id,
      razorpay_subscription_id: subscription_id,
      razorpay_signature: razorpay_signature,
    });

    user.subscription.status = "Active";

    await user.save();

    console.log("user is", user);

    res.status(200).json({
      success: true,
      message: "payment verified successfully!",
      user,
    });
  } catch (error) {
    console.log(error.message);

    return next(new AppError(error.message, 500));
  }
};
const cancelSubscription = async (req, res, next) => {
  const { id } = req.params;

  const { subscription_Id } = req.body;

  const user = await UserModel.findById(id);

  if (!user) {
    next(new AppError("unauthorized user"));
  }

  let isMember;

  if (user.subscription.status === "Active") {
    isMember = true;
  }

  if (!isMember) {
    return next(new AppError("user is not a member"));
  }

  const cancelledSubscription = razorpay.subscriptions.cancel({
    id: subscription_Id,
  });

  console.log(cancelledSubscription);
};
const getAllPayments = async (req, res, next) => {};

module.exports = {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  getAllPayments,
};
