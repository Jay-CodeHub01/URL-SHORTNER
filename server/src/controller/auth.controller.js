import wrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { cookiesOptions } from "../config/config.js";

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const token  = await registerUser( name, email, password );
    res.cookie("accessToken", token, cookiesOptions);
    res.status(200).json({ message: "User registered successfully"});
});

export const login_user = wrapAsync(async (req, res) => {
    const {email, password} = req.body;
    const token = await loginUser(email, password);
    res.cookie("accessToken", token, cookiesOptions);
    res.status(200).json({ message: "User logged in successfully"});
});

