import {Schema, model} from "mongoose";

const User = new Schema({
    username: {type: String, unique: true, require: true},
    password: {type: String, require: true},
});

const UserModel = model("User", User);

export default UserModel;
