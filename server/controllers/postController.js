import { Post } from "../models/postModel.js";

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "title is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "description is required",
      });
    }
    // Attach the user ID to the post
    req.body.author = req.user.userId;

    let post = await Post.create( req.body );
    
    post = await post.populate('author', 'name _id')
    
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log("🚀 ~ createPostController ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get post controller
const getAllPostController = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "_id name").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("🚀 ~ getPostController ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};

// get user posts
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId }).populate("author", "_id name").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("🚀 ~ getPostController ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
};

export { createPostController, getAllPostController, getUserPosts };
