// model imports
const PaymentModel = require("../Models/PaymentModule.js");
const UserModel = require("../Models/UserModel.js");

// lib imports
const Razorpay = require("razorpay");
const crypto = require("crypto");

// util imports
const AppError = require("../Utils/AppError.utils.js");

// setting razorpay configurations
const key_id = "rzp_test_nVbvUISEyz14Qf";
const key_secret = "7DsWX1XnQd1yHxf4SLksFXOm";

// setting razorpay instance
const razorpay = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});

// get razorpay configurations to get the payment view
const getRazorpayApiKey = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "razorpay api key",
    razorpayApiKey: key_id,
  });
};

// buy subscription api that will create subscription against the corresponding user
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
    // create the subscription
    const subscription = await razorpay.subscriptions.create({
      plan_id: "plan_PkOhdRnu6SYkPq",
      customer_notify: 1,
      total_count: 12,
    });

    // add the subscription data in the user obj
    user.subscription.id = subscription.id;
    user.subscription.status = " ";

    //saving the user obj

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

// handler function to be called onc ethe payment is done
// this will generate a separate payment signature as per the razorpay sdk
// and will match with signature returned by the razorpay
const verifySubscription = async (req, res, next) => {
  const { id } = req.params;

  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;

  // validate the user
  const user = await UserModel.findById(id);

  if (!user) {
    return next(new AppError("unauthorized please login", 400));
  }
  try {
    // get subscription id from the user obj
    const subscription_id = user.subscription.id;

    // generate the signature
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(`${razorpay_payment_id}|${subscription_id}`)
      .digest("hex");
    // match with one returned by the razorpay
    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("payment not verified please try again", 500));
    }
    // create payment obj
    await PaymentModel.create({
      razorpay_payment_id: razorpay_payment_id,
      razorpay_subscription_id: subscription_id,
      razorpay_signature: razorpay_signature,
    });

    // change the subscription status of the user
    user.subscription.status = "Active";

    // save the user obj
    await user.save();

    res.status(200).json({
      success: true,
      message: "payment verified successfully!",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// cancel the membership
const cancelSubscription = async (req, res, next) => {
  const { id } = req.params;

  // validate the user
  const user = await UserModel.findById(id);
  if (!user) {
    next(new AppError("unauthorized user"));
  }
  try {
    // to cancel the subscription we need subscription id of the user
    let subscription_Id = user.subscription.id;

    let isMember;
    // checking if the user member or not
    if (user.subscription.status === "Active") {
      isMember = true;
    }

    if (!isMember) {
      return next(new AppError("user is not a member"));
    }
    // cancelling the subscription
    const cancelledSubscription = await razorpay.subscriptions.cancel(
      subscription_Id
    );
    // updating the user obj as user no longer a member
    user.subscription.status = cancelledSubscription.status;
    user.subscription.id = null;

    // save the user obj
    await user.save();

    return res.status(200).json({
      success: true,
      message: "subscription cancelled successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    return next(new AppError(error.message, 400));
  }
};

// getting the payment data for the admins and owner
const getAllPayments = async (req, res, next) => {
  try {
    // getting the data of all subscriptions
    const subscriptions = await razorpay.subscriptions.all({
      count: 100,
    });

    // list of all available names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // initial record for the each month
    let initialMonthlyRecord = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    // let's grab the month names from the binary values
    const monthlyRecord = subscriptions.items.map((sub) => {
      const dates = new Date(sub.start_at * 1000).getMonth();
      return monthNames[dates];
    });

    // if the month exists in subscriptions
    // the record will be added to the coreesponsding to itself
    monthlyRecord.map((month) => {
      Object.keys(initialMonthlyRecord).forEach((m) => {
        if (m === month) {
          initialMonthlyRecord[month] += 1;
        }
      });
    });

    const finalMonths = {...initialMonthlyRecord}

    return res.status(200).json({
      success: true,
      subscriptions,
      monthlyRecord,
      finalMonths
    });
  } catch (error) {

    return next(new AppError(error.message, 400));
  }
};

module.exports = {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  getAllPayments,
};
