import { Post } from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

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
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "comments", // Name of the comments collection
          localField: "_id", // Field from the posts collection
          foreignField: "postId", // Field from the comments collection
          as: "comments", // Name of the new field to create
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" }, // Add a new field with the count of comments
        },
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "author", // Field from the posts collection (author ID)
          foreignField: "_id", // Field from the users collection
          as: "author", // Name of the new field to create
        },
      },
      {
        $unwind: {
          path: "$author", // Unwind the author array to get single author object
          preserveNullAndEmptyArrays: true, // Optional: keeps posts without authors
        },
      },
      {
        $project: {
          comments: 0, // Exclude the full comments array
          "author.password": 0, // Exclude sensitive fields, like password
          "author.__v": 0, // Exclude version key if using Mongoose
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field
      },
    ]);

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
    const posts = await Post.aggregate([
      {
        $match: {
          author: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $lookup: {
          from: "comments", // Name of the comments collection
          localField: "_id", // Field from the posts collection
          foreignField: "postId", // Field from the comments collection
          as: "comments", // Name of the new field to create
        },
      },
      {
        $addFields: {
          commentsCount: { $size: "$comments" }, // Add a new field with the count of comments
        },
      },
      {
        $lookup: {
          from: "users", // Name of the users collection
          localField: "author", // Field from the posts collection (author ID)
          foreignField: "_id", // Field from the users collection
          as: "author", // Name of the new field to create
        },
      },
      {
        $unwind: {
          path: "$author", // Unwind the author array to get a single author object
          preserveNullAndEmptyArrays: true, // Optional: keeps posts without authors
        },
      },
      {
        $project: {
          comments: 0, // Exclude the full comments array
          "author.password": 0, // Exclude sensitive fields, like password
          "author.__v": 0, // Exclude version key if using Mongoose
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort by createdAt field
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log("🚀 ~ getUserPosts ~ error:", error);
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

// post comments
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

// like on post controller
const likePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId, true);
    }
    
    await post.save();
    res.status(200).json({
      success: true,
      message: isLiked ? "Disliked post" : "Liked post",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
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
  likePostController,
};
