import express from 'express'
import { createPost, getFeedPosts, getUserPosts, likePost } from './../controllers/post.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';

const router = express.Router();

// FILE STORAGE
const storage = multer.diskStorage({
   destination: function(req, file, cb) {
      cb(null, "public/assets");
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname)
   }
})

const upload = multer({ storage })

router.post("/createPost", verifyToken, upload.single("picture"), createPost);
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);

export default router;