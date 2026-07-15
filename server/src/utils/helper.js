import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken"

export const generateNanoId = (length) =>{
    return nanoid(length);
}

export const signToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = (token) =>{

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    return decoded.id
}

export const buildPublicUrl = (path) => {
    const baseUrl = process.env.APP_URL || "http://localhost:3000"
    return new URL(path, baseUrl).toString()
}