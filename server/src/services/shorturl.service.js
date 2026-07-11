import {generateNanoId} from '../utils/helper.js';
import { saveShortUrl, getCustomShortUrl } from '../dao/shorturl.js';

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7);
    if(!shortUrl) throw new Error("Failed to generate short URL");
    await saveShortUrl(shortUrl, url);
    return shortUrl;
}

export const createShortUrlWithUser = async (url, userId, slug=null) => {
    const shortUrl = slug || generateNanoId(7);
    const exist = await getCustomShortUrl(slug);
    if(exist) throw new Error("Custom short URL already exists");
    await saveShortUrl(shortUrl, url, userId);
    return shortUrl;
}