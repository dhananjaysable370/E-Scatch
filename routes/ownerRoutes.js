import { Router } from "express";
import { createOwner } from "../controllers/ownerControllers/owner.js";

const ownerRouter = Router();
ownerRouter.post('/create', createOwner);
ownerRouter.put('/update', updateOwner);



export default ownerRouter;