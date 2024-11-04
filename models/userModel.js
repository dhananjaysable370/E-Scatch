import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        minLength: [5, "Full name length should be at least greater than 5 characters!"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: [8, "Password length should be at least 8 characters!"]
    },
    cart: {
        type: Array,
        default: []
    },
    isadmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
}, { timestamps: true });

export const userModel = mongoose.model('user', userSchema);