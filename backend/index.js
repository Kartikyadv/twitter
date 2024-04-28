import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase/firebaseconfig.js";
import { Server } from "socket.io";

dotenv.config({
    path:".env"
})
databaseConnection();
const app = express(); 

app.get("/testing",(req,res)=>{
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
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors(corsOptions));

// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/tweet", tweetRoute);
 

const server = app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
})

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
  }); // Pass the HTTP server instance to Socket.IO

// Socket.IO logic
io.on("connection", (socket) => {
    console.log("client connected");

    // Handle events here

    socket.on("disconnect", () => {
        console.log("client disconnected");
    });
});