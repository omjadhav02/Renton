import app from "./src/app.js";
import { Server } from "socket.io";
import http from "http";
import { chatHandler } from "./src/socket/chatSocket.js";

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

chatHandler(io);

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})