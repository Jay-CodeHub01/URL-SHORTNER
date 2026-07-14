import { cookieOptions } from "../config/config.js"
import { loginUser as loginUserService, registerUser as registerUserService } from "../services/auth.service.js"

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const { token, user } = await registerUserService(name, email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({ message: "register success" })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { token, user } = await loginUserService(email, password)
    req.user = user
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({ user, message: "login success" })
  } catch (error) {
    next(error)
  }
}

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({ message: "logout success" })
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user })
  } catch (error) {
    next(error)
  }
}