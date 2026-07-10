import wrapAsync from "../utils/wrapAsync.js";

export const register_user = wrapAsync(async (req, res) => {
    res.send("Register endpoint");
});

export const login_user = wrapAsync(async (req, res) => {
    res.send("Login endpoint");
})

