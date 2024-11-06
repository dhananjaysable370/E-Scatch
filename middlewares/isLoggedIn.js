import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

/**
 * Middleware function to check if a user is logged in.
 * 
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
export const isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You need to login first!");
        return res.status(401).redirect('/');
    }
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");
        if (!user) {
            req.flash("error", "User not found!");
            return res.status(404).redirect('/');
        }
        req.user = user;
        next();
    }
    catch (error){
        req.flash('error', "Invalid token or something went wrong!");
        return res.status(500).redirect('/');
    }
};