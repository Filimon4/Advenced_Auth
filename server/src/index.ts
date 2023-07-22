import express from "express";
import {config} from "dotenv";
import roots from "../roots/root.js"
import mongoose from "mongoose";

config()

const PORT = process.env.PORT || 5050
const app = express();

app.use(express.json());
app.use("/api", roots)

async function server() {
    try {
        // await mongoose.connect();
        app.listen(PORT, () => console.log('listening on port'))
    } catch (err) {
        console.log(err);
    }
}

server()
