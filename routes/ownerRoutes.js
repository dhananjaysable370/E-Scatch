import { Router } from "express";
import { createOwner, createProduct } from "../controllers/ownerControllers/owner.js";

const ownerRouter = Router();
ownerRouter.post('/create', createOwner);

ownerRouter.get('/createproduct', (req, res) => {
    try {
        res.render('createproducts', { success: '' })
    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
})
ownerRouter.post('/createproduct', createProduct);


export default ownerRouter;