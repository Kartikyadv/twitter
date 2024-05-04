import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseconfig.js";

dotenv.config({
    path:".env"
})
databaseConnection();
const app = express(); 

app.get("/",(req,res)=>{
    res.send("hi")
})

// Initialize Firebase
initializeApp(firebaseConfig);

// middlewares
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:process.env.FRONTEND_URL,
    credentials:true
}
app.use(cors(corsOptions));

// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet", tweetRoute);
 

const server = app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})