import {validationResult} from "express-validator";
import userServices from "../services/userServices.js";
import ApiError from "../exceptions/api-error.js";

class Auth {
    // @ts-ignore
    static registration = async (req, res, next) => {
        let userData;
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BabRequest("Validation failed", errors.array()),
                );
            }
            const {username, email, password} = req.body;
            userData = await userServices.registration(
                username,
                email,
                password,
            );
            res.cookie("refreshToken", userData?.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
        } catch (error) {
            next(error);
        }
        return res.json(userData);
    };

    // @ts-ignore
    static login = async (req, res, next) => {
        try {
            return;
        } catch (error) {
            next(error);
        }
    };

    // @ts-ignore
    static logout = async (req, res, next) => {
        // Delete jwt token from user
        try {
            return;
        } catch (error) {
            next(error);
        }
    };

    // @ts-ignore
    static activation = async (req, res, next) => {
        try {
            const activationLink = req.params.link;
            await userServices.activate(activationLink);
        } catch (error) {
            next(error);
        }
        return res.redirect(process.env.CLIENT_URL);
    };

    // @ts-ignore
    static refresh = async (req, res, next) => {
        try {
            return;
        } catch (error) {
            next(error);
        }
    };
}

export default Auth;
