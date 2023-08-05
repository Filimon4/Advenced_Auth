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
        let userData;
        try {
            const {email, password} = req.body;
            userData = await userServices.login(email, password);
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
    static logout = async (req, res, next) => {
        let token;
        try {
            const {refreshToken} = req.cookies;
            token = await userServices.logout(refreshToken);
            res.clearCookie("refreshToken");
        } catch (error) {
            next(error);
        }
        return res.json(token);
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
        let userData;
        try {
            const {refreshToken} = req.cookies;
            userData = await userServices.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken!, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
        } catch (error) {
            next(error);
        }
        console.log(userData)
        return res.json(userData);
    };
}

export default Auth;
