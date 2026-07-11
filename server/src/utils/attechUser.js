import { verifyToken } from "./helper.js";
import { findUserById } from "../dao/user.doa.js";

export const attechUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return next();
    }
    try{
        const decoded = verifyToken(token, process.env.JWT_SECRET);
        const user = await findUserById(decoded);
        if(!user){
            return next();
        }
        req.user = user;
        next();
    }catch(err){
        return next();
    }
}
