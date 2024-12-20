import express from "express";
import { config } from "dotenv";
config();
import userRoutes from "./Routes/User.routes.js";
import dbConnect from "./dbConnect.js";
import errorMiddleware from "./Middlewares/Error.middleware.js";
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import multer from 'multer'
import cloudinary from 'cloudinary'
import courseRoutes from "./Routes/courseRoutes.js";
import cors from 'cors'
import morgan from 'morgan'

const app = express();
app.use(cors())
const PORT = process.env.PORT
dbConnect();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const useMulter = multer()
app.use(useMulter.single())
app.use(morgan('dev'))

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/course', courseRoutes);
app.use(errorMiddleware);

app.listen(PORT,  ()=>{
    
    console.log(`server is listening to the http://localhost/${process.env.PORT}`)
});
