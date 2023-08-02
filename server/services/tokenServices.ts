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

    static validateAccessToken = async (accessToken: string) => {
        try {
            const validToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
            return validToken;
        } catch {
            return null
        }
        
    }
    
    static validateRefreshToken = async (refreshToken: string) => {
        try {
            const validToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)
            return validToken;
        } catch  {
            return null;
        }
    }

    static removeToken = async (refreshToken: string) => {
        const tokenData = await TokenModel.deleteOne({refreshToken});
        return tokenData;
    }

    static saveToken = async (userId: any, refreshToken: string) => {
        const token = await TokenModel.findOne({user: userId});
        if (token) {
            token.refreshToken = refreshToken;
            await token.save();
        }
        const tokenInst = await TokenModel.create({user: userId, refreshToken});
        return tokenInst;
    };

    static findToken = async (token: string) => {
        const tokenData = await TokenModel.findOne({token});
        return tokenData;
    }
}

export default TokenServices;
