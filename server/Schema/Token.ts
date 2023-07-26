import {Schema, model} from "mongoose";

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String, require: true}
})

const TokenModel = model("Token", Token);

export default TokenModel;