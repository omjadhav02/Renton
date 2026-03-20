import prisma from "../config/prisma.js"

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, city, address, propertyType, bedrooms, bathrooms } = req.body;

    const property = await prisma.property.create({
        data: {
            title,
            description,
            price: Number(price),
            city,
            address,
            propertyType,
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            ownerId: req.user.userId,
        }
    })

    res.status(201).json(property);

  } catch (error) {
    res.status(500).json({error: error.message});
  }
}


export const getProperties = async (req,res)=>{
    try {
        const { city, minPrice, maxPrice, type } = req.query;

        const filters = {};

        if(city) {
          filters.city = {
            contains: city,
       
          }
        }

        if(type) filters.propertyType = type;

        if(minPrice || maxPrice) {
            filters.price = {
                gte: minPrice ? Number(minPrice) : undefined,
                lte: maxPrice ? Number(maxPrice) : undefined,
            }
        }

        const properties = await prisma.property.findMany({
            where: filters, 
            include: {
                images: true,
                owner: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        res.json(properties);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getPropertyById = async (req, res)=>{
    try {
        const { id } = req.params;

        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                images: true,
                reviews: true,
                 owner: {
                    select: {
                        name: true,
                        email: true,
                    }
                 }
            }
        })

        if(!property){
            return res.status(404).json({message: " Property Not Found!"})
        }

        res.json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProperty = async (req, res) => {
  try {

    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id }
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.ownerId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await prisma.property.update({
      where: { id },
      data: req.body
    });

    res.json(updated);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteProperty = async (req, res) => {
  try {

    const { id } = req.params;

    const property = await prisma.property.findUnique({
      where: { id }
    });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.ownerId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await prisma.property.delete({
      where: { id }
    });

    res.json({ message: "Property deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};