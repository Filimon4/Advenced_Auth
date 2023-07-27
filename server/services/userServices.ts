import {v4} from "uuid";
import bcrypt from "bcrypt";
import UserModel from "../Schema/User.js";
import UserDto from "../dtos/user-dto.js";
import tokenServices from "./tokenServices.js";
import mailServices from "./mailServices.js";
import { constrainedMemory } from "process";

class UserServices {
    async registration(username: string, email: string, password: string) {
        const candidate = await UserModel.findOne({email});
        if (candidate) {
            throw new Error("There is already a user this this unsername or email")
        }
        const passwordHashed = await bcrypt.hash(password, 7);
        const activationLink = v4()

        const user = await UserModel.create({username, email, password: passwordHashed, activationLink})
        // mail service

        const userDto = new UserDto(user);
        const tokens = await tokenServices.generateToken({...userDto})
        await tokenServices.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
        
    }

    async login() {

    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw new Error("There is no user")
        }
        user.isActivated = true
        await user.save()
    }
}

export default new UserServices();