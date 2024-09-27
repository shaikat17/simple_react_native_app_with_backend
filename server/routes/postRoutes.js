import express from "express";
import { createPostController, deletePostController, getAllPostController, getUserPosts } from "../controllers/postController.js";
import { auth } from "../helpers/jwt.js";

const postRouter = express.Router();

// routes
postRouter.post("/create-post", auth, createPostController);

postRouter.get("/get-posts", getAllPostController);

postRouter.get("/get-user-posts", auth, getUserPosts);

postRouter.delete("/delete-post/:id", auth, deletePostController);

export default postRouter;
