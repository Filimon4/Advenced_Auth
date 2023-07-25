import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../Schema/User.js"
import { validationResult } from "express-validator";


class Auth {
    // @ts-ignore
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration failed", errors})
            }
            const {username, password} = req.body;
            const candidate = await UserModel.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "There is a user with this username"})
            }
            const hashPass = await bcrypt.hash(password, 7)
            const user = new UserModel({username, password: hashPass})
            await user.save()
            return res.status(200).json({message: "Registration successful"})
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error})
        }
    }

    // @ts-ignore
    async login(req, res) {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message: error})
        }
    }
}

export default new Auth()