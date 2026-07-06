import express from 'express';
const router = express.Router();
import { createShortUrl } from '../controller/shorturl.controller.js';

router.post('/', createShortUrl);