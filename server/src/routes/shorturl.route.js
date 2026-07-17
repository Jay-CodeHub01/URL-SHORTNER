import express from 'express';
import { createShortUrl, deleteShortUrl } from '../controller/shorturl.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post("/",createShortUrl);
router.delete("/:id", authMiddleware, deleteShortUrl);

export default router;