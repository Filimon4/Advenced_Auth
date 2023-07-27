import {validationResult} from "express-validator";
import userServices from "../services/userServices.js";
import ApiError from "../exceptions/api-error.js";

class Auth {
    // @ts-ignore
    async registration(req, res, next) {
        try {
           const errors = validationResult(req)
           if (!errors.isEmpty()) {
            return next(ApiError.BabRequest("Validation failed", errors.array()))
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
        try {
            
        } catch (error) {
            next(error)
        }
    }

    // @ts-ignore
    async logout(req, res, next) {
        // Delete jwt token from user
        try {
            
        } catch (error) {
            next(error)
        }
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
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export default new Auth();
