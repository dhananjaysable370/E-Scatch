import productModel from "../../models/productModel.js";

export const fetchShopData = async (req, res) => {
    try {
        const products = await Product.find({}).lean();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!", error: error.message });
    }
}