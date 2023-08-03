import tokenServices from "../services/tokenServices.js";
import ApiError from "../exceptions/api-error.js";

// @ts-ignore
// eslint-disable-next-line
export default (req, res, next) => {
    try {
        const authorizatinoToken = req.headers.authorization;
        if (!authorizatinoToken) {
            next(ApiError.UnathorizedError());
        }

        const AccessToken = authorizatinoToken.split(" ")[1];
        if (!AccessToken) {
            next(ApiError.UnathorizedError());
        }

        const userData = tokenServices.validateAccessToken(AccessToken);
        if (!userData) {
            next(ApiError.UnathorizedError());
        }

        req.user = userData;
        next();
        return;
    } catch (error) {
        next(ApiError.UnathorizedError());
    }
};
