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
            const {email, password} = req.body;
            const userData = await userServices.login(email, password);
            res.cookie('refreshToken', userData?.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error);
        }
    };

    // @ts-ignore
    static logout = async (req, res, next) => {
        // Delete jwt token from user
        try {
            const {refreshToken} = req.coookies;
            const token = await userServices.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
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
            const {refreshToken} = req.cookies;
            const userData = await userServices.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken!, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    };
}

export default Auth;
