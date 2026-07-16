import app from "../app.js"
import connectDB from "../src/config/mongo.config.js"

export default async function handler(req, res) {
  await connectDB()
  return app(req, res)
}