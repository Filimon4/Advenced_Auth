import express, {Express} from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import roots from "../rooter/root.js";
import errorMidleware from "../middlewares/error-middleware.js";

config();

const {PORT, DB_URL} = process.env;
const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use("/auth", roots);
app.use(errorMidleware);

async function server() {
    try {
        await mongoose.connect(DB_URL!);
        app.listen(PORT || 5050, () => console.log("listening on port")); // eslint-disable-line
    } catch (err) {
        // eslint-disable-next-line
        console.log(err);
    }
}

server();
