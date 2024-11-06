import mongoose, { Schema, model } from 'mongoose';

const ownerSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    products: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        default: []
    },
    picture: {
        type: String,
        default: ''
    },
    gstin: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const ownerModel = model('owner', ownerSchema);

export default ownerModel;