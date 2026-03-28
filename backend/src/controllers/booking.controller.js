import prisma from "../config/prisma.js";

export const createBooking = async(req,res)=> {
    try {
        const { propertyId, startDate, endDate } = req.body;

        const existingBooking = await prisma.booking.findFirst({
            where: {
                propertyId,
                tenantId: req.user.userId,
                status: {
                    in: ["pending", "approved"]
                }
            }
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "You have already booked this property"
            });
        }

        const booking = await prisma.booking.create({
            data: {
                propertyId,
                tenantId: req.user.userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status: "pending",
            }
        })

        if(!booking) {
            return res.status(400).json({error: "Failed to create booking"});
        }

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { tenantId: req.user.userId },
            include: {
                property: {
                    include: {
                        owner: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phone: true
                            }
                        },
                        images: true
                    }
                }
            }
        });

        res.json(bookings);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBookingRequests = async (req, res)=>{
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                property:{
                    ownerId: req.user.userId
                }
            },
            include: {
                property: {
                    include: {
                        images: true
                    }
                },
                tenant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                }
            }
        })

        if(!bookings) {
            return res.status(404).json({error: "No bookings found"});
        }   
        res.json(bookings);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


export const updateBookingStatus = async(req,res)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;

        const booking = await prisma.booking.update({
            where: { id },
            data: { status }
        })

        if(!booking) {
            return res.status(404).json({error: "Booking not found"});
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const deleteBookingRequest = async (req,res) =>{
    try {
        const { id } = req.params;

        const booking = await prisma.booking.delete({
            where: { id }
        })

        if(!booking) {
            return res.status(404).json({error: "Booking not found"});
        }
        res.json(booking);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}