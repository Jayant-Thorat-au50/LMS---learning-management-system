import express from "express";
import { config } from "dotenv";
config();
import userRoutes from "./Routes/User.routes.js";
import dbConnect from "./dbConnect.js";

const app = express();
const PORT = process.env.PORT

app.use("/api/v1/user", userRoutes);

app.listen(PORT, async ()=>{
    await dbConnect();
    console.log(`server is listening to the http://localhost/${process.env.PORT}`)
});
