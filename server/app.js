import dotenv from 'dotenv';
import express from 'express';
import { nanoid } from 'nanoid';
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/models/shorturl.model.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/create', (req, res) => {
    const {url} = req.body;
    const shortUrl = nanoid(6);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    });
    newUrl.save();
    console.log(url);
    res.send(nanoid(6));
});

app.get('/:id', async (req, res) => {
    const { id } = req.params;
    const url = await urlSchema.findOne({ short_url: id });
    if (url) {
        url.clicks++;
        await url.save();
        res.redirect(url.full_url);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(3000 , ()=> {
    connectDB();
    console.log('Server is running on port http://localhost:3000');
});


// GET - Redirection

// POST - Create short url