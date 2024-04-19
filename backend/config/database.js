import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:"../config/.env"
})
const databaseConnection = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(`Connected to mongoDB ${process.env.MONGO_URI}`);
    }).catch((error)=>{
        console.log(error);
    })
}
export default databaseConnection;