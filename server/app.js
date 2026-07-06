import express from 'express';
const app = express();
import {nanoid} from 'nanoid';


app.get('/api/create', (req, res) => {
    res.send(nanoid(6));
});

app.listen(3000 , ()=> {
    console.log('Server is running on port http://localhost:3000');
});


// GET - Redirection

// POST - Create short url