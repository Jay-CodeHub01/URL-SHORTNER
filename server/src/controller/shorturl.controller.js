import { createShortUrlWithoutUser } from '../services/shorturl.service.js';
import { getShortUrl } from '../dao/shorturl.js';
import urlSchema from '../models/shorturl.model.js';

export const createShortUrl = async (req, res) => {
    const {url} = req.body;
    const shortUrl = await createShortUrlWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
};

export const redirectToFullUrl = async (req, res) => {
    const { id } = req.params;
    const url = await getShortUrl(id);
    res.redirect(url.full_url);
}