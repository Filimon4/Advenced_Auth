import {validationResult} from "express-validator";
import userServices from "../services/userServices.js";

class Auth {
    // @ts-ignore
    async registration(req, res, next) {
        try {
           const validReq = validationResult(req)
           if (validReq.isEmpty()) {
            throw new Error('Request invalid')
           }
           const {username, email, password} = req.body;
           const userData = await userServices.registration(username, email, password)
           res.cookie("refreshToken", userData?.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
           return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    // @ts-ignore
    async login(req, res, next) {
    }

    // @ts-ignore
    async logout(req, res, next) {
        // Delete jwt token from user
    }
    // @ts-ignore
    async activation (req, res, next) {
        try {
            const activationLink = req.params.link
            await userServices.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }
    // @ts-ignore
    async refresh (req, res, next) {

    }
}

export default new Auth();
