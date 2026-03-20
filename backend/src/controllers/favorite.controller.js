import prisma from "../config/prisma.js";

export const addFavorite = async (req, res) => {
  try {

    const { propertyId } = req.body;

    const existing = await prisma.favorite.findFirst({
      where: {
        userId: req.user.userId,
        propertyId
      }
    });

    if (existing) {
      return res.json({ message: "Property already in favorites" });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: req.user.userId,
        propertyId
      }
    });

    res.status(201).json(favorite);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFavorites = async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: {
            userId: req.user.userId
            },
            include: {
            property: true
            }
        });
    

        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFavorite = async (req, res) => {
 try {
    const { id } = req.params;

    await prisma.favorite.delete({
        where: { id }
    });

    res.json({
        message: "Removed from favorites"
    });
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
  
};