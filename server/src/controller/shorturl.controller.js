import { createShortUrlWithoutUser } from '../services/shorturl.service.js';
import { getShortUrl } from '../dao/shorturl.js';
import urlSchema from '../models/shorturl.model.js';
import wrapAsync from '../utils/tryCatchWrapper.js';

export const createShortUrl = wrapAsync(async (req, res) => {
    const {url} = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.status(201).json({ shortUrl: process.env.APP_URL + shortUrl });
});

export const redirectToFullUrl = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    if(!url) throw new Error("Short URL not found");
    res.redirect(url.full_url);
})