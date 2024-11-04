import { Router } from "express";

const ownerRouter = Router();

ownerRouter.get('/', (req,res) => {
    res.send("Hello this is owner route!");
})

export default ownerRouter;