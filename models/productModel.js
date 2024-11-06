import { Schema, model } from "mongoose";

const productSchema = new Schema({
    image: {
        type: String,
        required: [true, 'Product image is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, 'Discount cannot be negative']
    },
    colors: {
        bgcolor: {
            type: String,
            required: [true, 'Background color is required'],
            trim: true
        },
        panecolor: {
            type: String,
            required: [true, 'Pane color is required'],
            trim: true
        },
        textcolor: {
            type: String,
            required: [true, 'Text color is required'],
            trim: true
        }
    }
}, { timestamps: true });

const productModel = model('Product', productSchema);
export default productModel;