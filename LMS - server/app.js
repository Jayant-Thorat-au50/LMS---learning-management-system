const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// custom lib and middleware imports
const cloudinary = require("cloudinary");
const dbConnect = require("./dbConnect.js");

// Routes imports
const courseRoutes = require("./Routes/courseRoutes.js");
const {errorMiddleware} = require('./Middlewares/errorMiddleware.js')
const userRoutes = require("./Routes/User.routes.js");
const paymentRoutes = require("./Routes/PaymentRoutes.js");

const app = express();
app.use(cors({
  origin:"https://localhost:5173",
  credentials:true
}));
const PORT = process.env.PORT;
dbConnect();
cloudinary.v2.config({
  cloud_name: "lms-jayant-thorat",
  api_key: "819524559332278",
  api_secret: "VLNZXWiOwPhKEQaut0U-00nDjgI",
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(
    `server is listening to the http://localhost/${process.env.PORT}`
  );
});
