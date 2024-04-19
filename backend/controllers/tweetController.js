import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";
import {Messages} from "../messages/stringMessage.js";
import { 
    getStorage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL,
    uploadBytes,
    deleteObject
} from "firebase/storage";
import {
    getResponseResolver
} from "../utils/user-utils.js";

export const createTweet = async (req, res) => {

    const { description, id } = req.body;
    const userId = id;
    const caption = description;
    const location = "delhi";
    const images = req.files;
    const userDetails = await User.findById(userId);
    console.log(req.file);

    if(images || caption){
        if(images){
            const imagesUrl = [];
            for (const file of req.files) {     
                if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ){
                    try {
                        const storage = getStorage();

                        const metadata = {
                            contentType: file.mimetype
                        };
                    
                        const storageRef = ref(storage, `images/user/posts/${userId}-${Date.now()}`);
                    
                        const uploadTask = await uploadBytes(storageRef, file.buffer, metadata);
                        const imageUrl = await getDownloadURL(uploadTask.ref);

                        imagesUrl.push(imageUrl);
                                                
                    }  catch (error) {
                        return res.status(400).json(
                            getResponseResolver(false, 400, Messages.error_in_adding_post, {"Error": error})); 
                    }
                } else  {
                        return res.status(400).json(
                            getResponseResolver(false, 400, Messages.invalid_format_of_image, {"Error": Messages.invalid_format_of_image}));
                }
            }

                await Tweet.create({ userId: userId, imageUrl: imagesUrl, location: location ,description: caption,userDetails:userDetails});
                return res.status(200).json(
                    getResponseResolver(true, 200,Messages.post_added)); 

        } else {
            try {
                await Tweet.create({ userId: userId, location: location ,description: caption,userDetails:userDetails});
        
                return res.status(200).json(
                    getResponseResolver(true, 200,Messages.post_added));     
            }  catch (error) {
                return res.status(400).json(
                    getResponseResolver(false, 400, Messages.error_in_adding_post, {"Error": error})); 
            }
        }
    }else  {
        return res.status(400).json(
            getResponseResolver(false, 400, Messages.add_images_or_caption, {"Error": Messages.add_images_or_caption})); 
    } 

    // try {
    //     const { description, id } = req.body;
    //     const images = req.files;
    //     console.log(images);
    //     console.log(req.body);
    //     if ((!description || !id) || (!images || !id)) {
    //         return res.status(401).json({
    //             message: "Fields are required.",
    //             success: false
    //         });
    //     };
    //     const user = await User.findById(id).select("-password");
    //     await Tweet.create({
    //         description,
    //         userId:id,
    //         userDetails:user
    //     });
    //     return res.status(201).json({
    //         message:"Tweet created successfully.",
    //         success:true,
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
}
export const deleteTweet = async (req,res) => {
    try {
        const {id}  = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
            // like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};
export const getAllTweets = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweet),
        })
    } catch (error) {
        console.log(error);
    }
}
export const getFollowingTweets = async (req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}
 