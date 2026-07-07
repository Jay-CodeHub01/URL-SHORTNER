import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/mongo.config.js';

import shortUrl from './src/routes/shorturl.route.js';
import { redirectToFullUrl } from './src/controller/shorturl.controller.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/create', shortUrl);
app.get('/:id', redirectToFullUrl);

app.use(errorHandler);


app.listen(3000 , ()=> {
    connectDB();
    console.log('Server is running on port http://localhost:3000');
});