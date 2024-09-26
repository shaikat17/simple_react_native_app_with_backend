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
    
    req.body.author = req.user.userId;
    const post = await Post.create( req.body );
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

export { createPostController };
