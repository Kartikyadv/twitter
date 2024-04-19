import express from "express";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";
import multer from "multer";

const router = express.Router();
router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
router.route("/like/:id").put(isAuthenticated,likeOrDislike);
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);

const upload = multer({ storage: multer.memoryStorage() });
router.post("/create", isAuthenticated, upload.array('image', 8), createTweet);
export default router;