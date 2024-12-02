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

const app = express();
const PORT = process.env.PORT
dbConnect();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

cloudinary.config({
    cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const useMulter = multer()
app.use(useMulter.array())

// app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/v1/user', userRoutes);
app.use(errorMiddleware);

app.listen(PORT,  ()=>{
    
    console.log(`server is listening to the http://localhost/${process.env.PORT}`)
});
