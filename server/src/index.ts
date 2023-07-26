import express, {Express} from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import roots from "../roots/root.js";

config();

const {PORT, DB_URL} = process.env
const app: Express = express();

app.use(express.json());
app.use("/auth", roots);

async function server() {
    try {
        await mongoose.connect(DB_URL!);
        app.listen(PORT || 5050, () => console.log("listening on port"));
    } catch (err) {
        console.log(err);
    }
}

server();
