import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/config/mongo.config.js"
import shortUrlRoutes from "./src/routes/shorturl.route.js"
import userRoutes from "./src/routes/user.route.js"
import authRoutes from "./src/routes/auth.route.js"
import { redirectFromShortUrl } from "./src/controller/shorturl.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attechUser.js";
import cookieParser from "cookie-parser"

dotenv.config("./.env")

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
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

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on http://localhost:3000");
})

// GET - Redirection 