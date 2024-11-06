import bcrypt from 'bcrypt';
import { ownerModel } from "../../models/ownerModel.js";

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
