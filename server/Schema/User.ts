import {Schema, model} from "mongoose";

const User = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
});

const UserModel = model("User", User);

export default UserModel;
