import express from 'express'
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
