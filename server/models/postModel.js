import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add post title.'],
    },
    description: {
        type: String,
        required: [true, 'Please add post description.'],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true})

export const Post = mongoose.model('Post', postSchema)