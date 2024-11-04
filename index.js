import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import dbConnection from './config/db.js';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import productRouter from './routes/productRoutes.js';
dotenv.config();

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

dbConnection(MONGO_URI, () => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.use('users', userRouter);
app.use('owners', ownerRouter);
app.use('products', productRouter);
