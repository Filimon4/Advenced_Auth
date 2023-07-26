import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {validationResult} from "express-validator";
import UserModel from "../Schema/User.js";

function generateAccessToken(id: string) {
    const payload = {id};
    return jwt.sign(payload, "SERCREAT_KEY", {expiresIn: "24h"});
}

class Auth {
    // @ts-ignore
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({message: "Registration failed", errors});
            }
            const {username, password} = req.body;
            const candidate = await UserModel.findOne({username});
            if (candidate) {
                return res
                    .status(400)
                    .json({message: "There is a user with this username"});
            }
            const hashPass = await bcrypt.hash(password, 7);
            const user = new UserModel({username, password: hashPass});
            await user.save();
            return res.status(200).json({message: "Registration successful"});
        } catch (error) {
            res.status(400).json({message: error});
        }
    }

    // @ts-ignore
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await UserModel.findOne({username});
            if (!user) {
                return res.status(400).json({
                    message: `There is not user with this username ${username}`,
                });
            }
            const validPassword = bcrypt.compareSync(password, user.password!);
            if (!validPassword) {
                return res
                    .status(400)
                    .json({message: "The password is incorrect"});
            }
            const jwtAccesToken = generateAccessToken(user._id.toString());
            return res.json({jwtAccesToken});
        } catch (error) {
            res.status(400).json({message: error});
        }
    }

    // @ts-ignore
    async logout(req, res) {
        // Delete jwt token from user
    }
}

export default new Auth();
