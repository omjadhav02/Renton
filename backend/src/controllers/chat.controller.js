import prisma from "../config/prisma.js";

export const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        const messages = await prisma.chatMessage.findMany({
            where: {
                OR: [
                    {senderId: req.user.userId, receiverId: userId },
                    {senderId: userId, receiverId: req.user.userId }
                ]
            },

            orderBy: {
                createdAt: "asc"
            }
        })

        res.json(messages);
        
    } catch (error) {
        res.status(500).json({ message: "Failed to get messages", error: error.message });
    }
}

export const markAsSeen = async (req,res) => {
    try {
        const {userId} = req.params;

        await prisma.chatMessage.updateMany({
            where: {
                senderId: userId,
                receiverId: req.user.userId,
                seen: false,
            },
            data: { seen: true}
        })

        res.json({ success: true})
    } catch (error) {
         res.status(500).json({error: error.message });
    }
    

    
}