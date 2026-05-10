import app from "./src/app.js";
import { Server } from "socket.io";
import http from "http";
import { chatHandler } from "./src/socket/chatSocket.js";
import dotenv from "dotenv"

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true
    }
})

chatHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})