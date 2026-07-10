import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user.doa.js"
import { ConflictError } from "../utils/errorHandler.js"
import {signToken} from "../utils/helper.js"

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email)
    if(user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, email, password)
    const token = await signToken({id: newUser._id})
    return {token,user}
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email)
    if(!user || user.password !== password) throw new ConflictError("Invalid email or password")
    const token = signToken({id: user._id})
    return {token,user}
}