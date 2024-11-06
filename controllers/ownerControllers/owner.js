import bcrypt from 'bcrypt';
import ownerModel from "../../models/ownerModel.js";
import productModel from '../../models/productModel.js';

export const createOwner = async (req, res) => {
    const owners = await ownerModel.find();
    if (owners.length > 0) {
        res.status(503).json({ success: false, message: "Owner already created!" });
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdOwner = await ownerModel.create({
        fullname,
        email,
        password: hashedPassword
    })

    res.status(200).json({ success: true, message: "Owner created successfully", createdOwner });
}


export const createProduct = async (req, res) => {
    try {
        const { image, name, price, discount, bgcolor, panecolor, textcolor } = req.body;

        if (!image || !name || !price || !discount || !bgcolor || !panecolor || !textcolor) {
            res.status(400).json({ success: false, message: "Please provide all required fields" });
            return;
        }

        const createdProduct = await productModel.create({
            image,
            name,
            price,
            discount,
            bgcolor,
            panecolor,
            textcolor
        })

        if (!createdProduct) {
            res.status(400).json({ success: false, message: "Product not created!" });
        }
        res.status(201).json({ success: true, message: "Product created successfully", createdProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create product", error: error.message });
    }
}