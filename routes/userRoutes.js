import { Router } from "express";

const userRouter = Router();
userRouter.get('/', (req, res) => {
    res.send("Hello this is user Router!");
})

export default userRouter;