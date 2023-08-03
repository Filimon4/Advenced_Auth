import {v4} from "uuid";
import bcrypt from "bcrypt";
import UserModel from "../Schema/User.js";
import UserDto from "../dtos/user-dto.js";
import tokenServices from "./tokenServices.js";
import ApiError from "../exceptions/api-error.js";
import {JwtPayload} from "../utils/jwt_interface.js";
// import mailServices from "./mailServices.js";

class UserServices {
    static registration = async (
        username: string,
        email: string,
        password: string,
    ) => {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw ApiError.BabRequest(
                "There is already a user this this unsername or email",
            );
        }
        const passwordHashed = await bcrypt.hash(password, 7);
        const activationLink = v4();

        const user = await UserModel.create({
            username,
            email,
            password: passwordHashed,
            activationLink,
        });
        // mail service

        const userDto = new UserDto(user);
        const tokens = tokenServices.generateToken({...userDto});
        await tokenServices.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    };

    static login = async (email: string, password: string) => {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BabRequest("There is not user with email");
        }
        const validPassword = await bcrypt.compare(password, user.password!);
        if (!validPassword) {
            throw ApiError.BabRequest("The password is incorrect");
        }
        const userDto = new UserDto(user);
        const token = tokenServices.generateToken({...userDto});

        await tokenServices.saveToken(userDto.id, token.refreshToken);
        return {...token, user: userDto};
    };

    static logout = async (refreshToken: string) => {
        const token = await tokenServices.removeToken(refreshToken);
        return token;
    };

    static activate = async (activationLink: string) => {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BabRequest("There is no user");
        }
        user.isActivated = true;
        await user.save();
    };

    static refresh = async (refreshToken: string) => {
        if (!refreshToken) {
            throw ApiError.UnathorizedError();
        }
        const userData = ( tokenServices.validateRefreshToken(
            refreshToken,
        )) as JwtPayload;
        const tokenFromDB = await tokenServices.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnathorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const token = tokenServices.generateToken({...userDto});

        await tokenServices.saveToken(userDto.id, token.refreshToken);
        return {...token, user: userDto};
    };

    static getUsers = async () => {
        const users = await UserModel.find();
        return users;
    };
}

export default UserServices;
