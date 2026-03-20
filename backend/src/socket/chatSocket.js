import prisma from "../config/prisma.js";

export const chatHandler = (io) =>{
    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);


        socket.on("join", (userId)=>{
            socket.join(userId);
            console.log("User joined room: ", userId);
        })

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

        socket.on("disconnect", ()=>{
            console.log("User disconnected");
        })
    });


}