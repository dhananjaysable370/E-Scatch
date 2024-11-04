import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    paneColor: String,
    textcolor: String
}, { timestamps: true });

export const productModel = mongoose.model('Product', productSchema);