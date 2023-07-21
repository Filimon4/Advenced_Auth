import http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5050;
const server = http.createServer();

server.listen(PORT);
