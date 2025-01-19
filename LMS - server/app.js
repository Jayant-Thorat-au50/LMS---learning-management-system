import express from "express";
import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

// custom lib and middleware imports
import cloudinary from "cloudinary";
import dbConnect from "./dbConnect.js";
import errorMiddleware from "./Middlewares/Error.middleware.js";
// Routes imports
import courseRoutes from "./Routes/courseRoutes.js";
import userRoutes from "./Routes/User.routes.js";
import paymentRoutes from "./Routes/PaymentRoutes.js";

const app = express();
app.use(cors());
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
