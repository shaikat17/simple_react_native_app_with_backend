import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add email.'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please add password'],
        min: 6,
        max: 20
    },
    role: {
        type: String,
        default: 'user'
    },
},
    { timestamps: true })

export const User = mongoose.model('User', userSchema)