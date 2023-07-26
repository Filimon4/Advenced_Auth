import {validationResult} from "express-validator";
import userServices from "../services/userServices.js";

class Auth {
    // @ts-ignore
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next()
            }
            const {email, password} = req.body;
            const userData = await userServices.registration(email, password)
            res.cookie( 'refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // write cookies
            return res.json(userData); // return UserData in json object
        } catch (error) {
            next(error);
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

    }
    // @ts-ignore
    async refresh (req, res, next) {

    }
}

export default new Auth();
