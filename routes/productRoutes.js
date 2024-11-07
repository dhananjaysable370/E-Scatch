import { Router } from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import productModel from "../models/productModel.js";

const productRouter = Router();

productRouter.get('/', (req, res) => {
    res.render("createproducts",{success:true})
})

productRouter.post('/create', async (req, res) => {
    try {
        const { image, name, price, discount, colors } = req.body;
        if (!image || !name || !price || !discount || !colors) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const newProduct = await productModel.create({ image, name, price, discount, colors });
        if (!newProduct) {
            return res.status(400).json({ message: "Failed to create product" });
        }
        res.status(201).send({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to create product', error: error.message });
    }
});

export default productRouter;