import urlSchema from '../models/shorturl.model.js';

export const saveShortUrl = async (shortUrl, Url, userId) => {
    const newUrl = new urlSchema({
        full_url: Url,
        short_url: shortUrl
    });
    if(userId){
        newUrl.user = userId;
    }
    newUrl.save();
}

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url: shortUrl}, { $inc: { clicks: 1 } });
}