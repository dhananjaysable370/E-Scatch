import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userControllers/user.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
const userRouter = Router();
userRouter.get('/', (req, res) => {
    res.send("Hello this is user Router!");
})

userRouter.post('/register', (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.render('index', { error: error.details[0].message });
    }
    else {
        registerUser(req, res, next);
    }
});

userRouter.post('/login', (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.render('index', { error: error.details[0].message });
    } else {
        // login logic
        loginUser(req, res, next);
    }
})

export default userRouter;