import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minLength: 6,
        trim: true
    },
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String
}, { timestamps: true });

export const ownerModel = mongoose.model('owner', ownerSchema);