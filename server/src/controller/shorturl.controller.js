import { getShortUrl } from "../dao/shorturl.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shorturl.service.js"

export const createShortUrl = async (req, res, next) => {
  try {
    const data = req.body
    let shortUrl
    if (req.user) {
      shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug)
    } else {
      shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
  } catch (error) {
    next(error)
  }
}

export const redirectFromShortUrl = async (req, res, next) => {
  try {
    const { id } = req.params
    const url = await getShortUrl(id)
    if (!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)
  } catch (error) {
    next(error)
  }
}

export const createCustomShortUrl = async (req, res, next) => {
  try {
    const { url, slug } = req.body
    const shortUrl = await createShortUrlWithoutUser(url, slug)
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
  } catch (error) {
    next(error)
  }
}