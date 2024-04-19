import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    like:{
        type:Array,
        default:[]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageUrl: [
        {
            type: String,
        }
    ],
    userDetails:{
        type:Array,
        default:[]
    },
    location: {
        type: String,
    }
},{timestamps:true});
export const Tweet = mongoose.model("Tweet", tweetSchema);