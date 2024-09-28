import express from "express";
import { createPostController, deletePostController, getAllPostController, getCommentsController, getUserPosts, postCommentsController, updatePostController } from "../controllers/postController.js";
import { auth } from "../helpers/jwt.js";

const postRouter = express.Router();

// routes
postRouter.post("/create-post", auth, createPostController);

postRouter.get("/get-posts", getAllPostController);

postRouter.get("/get-user-posts", auth, getUserPosts);

postRouter.delete("/delete-post/:id", auth, deletePostController);

postRouter.put("/update-post/:id", auth, updatePostController);

postRouter.post("/add-comment", auth, postCommentsController);

postRouter.get("/get-comments/:postId", getCommentsController);


export default postRouter;
