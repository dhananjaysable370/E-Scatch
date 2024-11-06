import { userModel } from "../../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            fullname,
            email,
            password: hashedPassword
        })

        if (!user) {
            return res.status(406).json({ success: false, message: "Couldn't create a user!" });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie("token", token);
        res.status(201).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: "Invalid Credentials!" });
        }
        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.cookie("token", token);
        res.status(200).json({ success: true, message: "User logged in successfully", token });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error!", error: error.message });
    }
}