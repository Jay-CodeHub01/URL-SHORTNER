import "dotenv/config"
import express from "express";
import connectDB from "./src/config/mongo.config.js"
import shortUrlRoutes from "./src/routes/shorturl.route.js"
import userRoutes from "./src/routes/user.route.js"
import authRoutes from "./src/routes/auth.route.js"
import { redirectFromShortUrl } from "./src/controller/shorturl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attechUser.js";
import cookieParser from "cookie-parser"

const app = express();

// const clientOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
//     .split(",")
//     .map((origin) => origin.trim())
//     .filter(Boolean)


app.use(cors({
    origin: "https://shortyfy.vercel.app",
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/create", shortUrlRoutes)
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)

const startServer = async () => {
    await connectDB()
    const port = process.env.PORT || 3000
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
}

if (process.env.VERCEL !== "1") {
    startServer().catch((error) => {
        console.error("Failed to start server:", error)
        process.exit(1)
    })
}

// GET - Redirection 

export default app