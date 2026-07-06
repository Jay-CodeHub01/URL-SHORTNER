export const createShortUrl = async (req, res) => {
    const {url} = req.body;
    const shortUrl = nanoid(6);
    const newUrl = new urlSchema({
        full_url: url,
        short_url: shortUrl
    });
    newUrl.save();
    console.log(url);
    res.send(nanoid(6));
};