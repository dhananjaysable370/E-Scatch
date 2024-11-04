import { Router } from "express";

const productRouter = Router();


productRouter.get('/', (req, res) => {
    res.send("Hello this is product Router!");
})

export default productRouter;