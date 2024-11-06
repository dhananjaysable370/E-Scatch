import express from 'express';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import debug from 'debug';
import dbConnection from './config/db.js';
import { fileURLToPath } from 'url';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import productRouter from './routes/productRoutes.js';
import router from './routes/route.js';

dotenv.config();

const mongooseDebug = debug('development:mongoose');

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());

const sessionConfig = {
    resave: false,
    saveUninitialized: false,
    secret: EXPRESS_SESSION_SECRET,
};

app.use(session(sessionConfig));

dbConnection(MONGO_URI, () => {
    mongooseDebug('Successfully connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

app.use('/', router);
app.use('/users', userRouter);
app.use('/owners', ownerRouter);
app.use('/products', productRouter);

app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});