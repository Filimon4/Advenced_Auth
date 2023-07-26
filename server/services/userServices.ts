import {v4} from "uuid";
import bcrypt from "bcrypt";
import UserModel from "../Schema/User.js";
import UserDto from "../dtos/user-dto.js";
import tokenServices from "./tokenServices.js";
import mailServices from "./mailServices.js";

class UserServices {
    async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
        }
        const hashPass = await bcrypt.hash(password, 7);
        const activationLink = v4() // for email

        const user = new UserModel({email, password: hashPass});
        await mailServices.sendActivationMail(email, `${process.env.API_URL}/api/activation/${activationLink}`)

        const userDto = new UserDto(user); // eamil, id, is Activated
        const tokens = await tokenServices.generateToken(userDto)
        await tokenServices.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login() {
        
    }

    async activate() {

    }
}

export default new UserServices();