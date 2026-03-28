import prisma from "../config/prisma.js";

export const createReview = async (req, res) => {
  try {

    const { propertyId, rating, comment } = req.body;

    const booking = await prisma.booking.findFirst({
      where: {
        propertyId,
        tenantId: req.user.userId,
        status: "approved"
      }
    });

    if (!booking) {
      return res.status(403).json({
        message: "You must book this property before reviewing"
      });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        propertyId,
        tenantId: req.user.userId
      },
      include: {
        tenant: {
            select: {
                name: true
            }
        }
      }
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getPropertyReviews = async (req, res) => {
    try {
        const { id } = req.params;

        const reviews = await prisma.review.findMany({
            where: {
            propertyId: id
            },
            include: {
                tenant: {
                    select: {
                    name: true
                    }
                },
            }
        });
        if(!reviews){
            return res.status(404).json({
                message: "Review Not Found!"
            })
        }

        res.json(reviews);
    } catch (error) {
        res.status(500).json({error: error.message })
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await prisma.review.findUnique({
            where: { id }
        });

        if (!review) {
            return res.status(404).json({
            message: "Review not found"
            });
        }

        if (review.tenantId !== req.user.userId) {
            return res.status(403).json({
            message: "Unauthorized"
            });
        }

        await prisma.review.delete({
            where: { id }
        });

        res.json({
            message: "Review deleted"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};