import { Router } from "express";
import { createOwner } from "../controllers/ownerControllers/owner.js";

const ownerRouter = Router();
ownerRouter.post('/create', createOwner);



export default ownerRouter;