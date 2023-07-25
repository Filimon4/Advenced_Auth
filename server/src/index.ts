import express from "express";
import {Express} from "express";
import {config} from "dotenv";
import roots from "../roots/root.js";
import mongoose from "mongoose";

config();

const PORT = process.env.PORT || 5050;
const DB_URL = process.env.DB_URL;
const app: Express = express();

app.use(express.json());
app.use("/auth", roots);

async function server() {
    try {
        await mongoose.connect(DB_URL!);
        app.listen(PORT, () => console.log("listening on port"));
    } catch (err) {
        console.log(err);
    }
}

server();
