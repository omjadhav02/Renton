import prisma from "../config/prisma.js";

const onlineUsers = new Set();

export const chatHandler = (io) =>{
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);


        socket.on("join", (userId)=>{
            socket.join(userId);

            onlineUsers.add(userId);
            io.emit("online_users", Array.from(onlineUsers))
            console.log("User joined room: ", userId);
        })

        socket.on("typing", ({ senderId, receiverId }) => {
            socket.to(receiverId).emit("user_typing", senderId);
        });

        socket.on("send_message", async (data)=>{
            const { senderId, receiverId, message } = data;

            const savedMessage = await prisma.chatMessage.create({
                data:{
                    senderId,
                    receiverId,
                    message
                }
            })

            io.to(senderId).emit("receive_message", savedMessage);
            io.to(receiverId).emit("receive_message", savedMessage);
        });

        socket.on("disconnect", ()=> {
            if(socket.userId){
                onlineUsers.delete(socket.userId);
                io.emit("online_users", Array.from(onlineUsers))
            }
            console.log("User disconnected");
        })
    });


}