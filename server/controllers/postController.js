import { Post } from "../models/postModel.js";
import Comment from "../models/commentModel.js";

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

    let post = await Post.create(req.body);

    post = await post.populate("author", "name _id");

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
    const posts = await Post.find()
      .populate("author", "_id name avatar")
      .sort({ createdAt: -1 });
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
      error,
    });
  }
};

// get user posts
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId })
      .populate("author", "_id name avatar")
      .sort({ createdAt: -1 });
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
      error,
    });
  }
};

// delete post controller
const deletePostController = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log("🚀 ~ deletePostController ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update post controller
const updatePostController = async (req, res) => {
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
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    console.log("🚀 ~ updatePostController ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const postCommentsController = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const { userId } = req.user;
    console.log("🚀 ~ postCommentsController ~ userId:", userId)

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Please write something before commenting",
      });
    }

    const newComment = new Comment({
      postId,
      userId,
      comment,
    });

    await newComment.save();
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      newComment
    })
  } catch (error) {}
};

// get comments
const getCommentsController = async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await Comment.find({postId}).populate("userId", "name avatar").sort({createdAt: -1});
    res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.log("🚀 ~ getCommentsController ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export {
  createPostController,
  getAllPostController,
  getUserPosts,
  deletePostController,
  updatePostController,
  postCommentsController,
  getCommentsController,
};
