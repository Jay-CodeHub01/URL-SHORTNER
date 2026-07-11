import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/mongo.config.js';
import cookieParser from 'cookie-parser';
import {attechUser} from './src/utils/attechUser.js';

import shortUrl from './src/routes/shorturl.route.js';
import authRoute from './src/routes/auth.route.js';
import { redirectToFullUrl } from './src/controller/shorturl.controller.js';
import {errorHandler} from './src/utils/errorHandler.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(attechUser);

app.use('/api/create', shortUrl);
app.get('/:id', redirectToFullUrl);
app.use('/api/auth', authRoute);

app.use(errorHandler);

app.listen(3000 , ()=> {
    connectDB();
    console.log('Server is running on port http://localhost:3000');
});