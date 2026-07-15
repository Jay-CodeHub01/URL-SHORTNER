import { getCookieOptions } from "../config/config.js"
import { loginUser as loginUserService, registerUser as registerUserService } from "../services/auth.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body
  const { token, user } = await registerUserService(name, email, password)
  req.user = user
  res.cookie("accessToken", token, getCookieOptions())
  res.status(200).json({ user, message: "register success" })
})

export const login_user = wrapAsync(async (req, res) => {
  const { email, password } = req.body
  const { token, user } = await loginUserService(email, password)
  req.user = user
  res.cookie("accessToken", token, getCookieOptions())
  res.status(200).json({ user, message: "login success" })
})

export const logout_user = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken", getCookieOptions())
  res.status(200).json({ message: "logout success" })
})

export const get_current_user = wrapAsync(async (req, res) => {
  res.status(200).json({ user: req.user })
})