import jwt from "jsonwebtoken";
import TokenModel from "../Schema/Token.js";

class TokenServices {
    static generateToken = async (payload: object) => {
        const accessToken = jwt.sign(
            {...payload},
            process.env.JWT_ACCESS_SECRET!,
            {expiresIn: "15s"},
        );
        const refreshToken = jwt.sign(
            {...payload},
            process.env.JWT_REFRESH_SECRET!,
            {expiresIn: "60s"},
        );
        return {accessToken, refreshToken};
    };

    static saveToken = async (userId: any, refreshToken: string) => {
        const token = await TokenModel.findOne({user: userId});
        if (token) {
            token.refreshToken = refreshToken;
            await token.save();
        }
        const tokenInst = await TokenModel.create({user: userId, refreshToken});
        return tokenInst;
    };
}

export default TokenServices;
