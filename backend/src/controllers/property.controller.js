import prisma from "../config/prisma.js"

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, city, address, propertyType, bedrooms, bathrooms, state, postCode, country, deposit } = req.body;

    if(!title || !description || !price || !city || !address || !propertyType || !bedrooms || !bathrooms || !state || !postCode || !country || !deposit) {
      return res.status(400).json({message: "All fields required!"})
    }

    const property = await prisma.property.create({
        data: {
            title,
            description,
            price: Number(price),
            deposit: Number(deposit),
            address,
            city,
            state,
            country,
            postCode,
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
            },
            orderBy: {
              createdAt: "desc"
            }
        })

        res.json(properties);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const getOwnerProperties = async (req, res) => {
    try {
      const ownerId = req.user.userId;

      const properties = await prisma.property.findMany({
        where:{
          ownerId: ownerId
        },
        include: {
          images: true,
          reviews: true,
        },
        orderBy: {
          createdAt: "desc"
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

export const searchProperties = async (req, res) => {
  try {
    const { country, state, city, minPrice, maxPrice, bedrooms, propertyType } = req.query;

    const filters = {};

    if(city){
      filters.city = {
        contains: city,
        mode: "insensitive"
      }
    }
    
    if(state){
      filters.state = {
        contains: state,
        mode: "insensitive"
      }
    }

    if(country){
      filters.country = {
        contains: country,
        mode: "insensitive"
      }
    }


    if(propertyType){
      filters.propertyType = {
        contains: propertyType,
        mode: "insensitive"
      }
    }

    if(bedrooms){
      filters.bedrooms = Number(bedrooms);
    }

    if(minPrice || maxPrice){
      filters.price = {
        ...(minPrice && {gte: Number(minPrice)}),
        ...(maxPrice && {lte: Number(maxPrice)}),
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
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    res.json(properties);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
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

    const allowedFields = [
      "title", "description", "city", "address",
      "state", "country", "postCode", "propertyType"
    ];

    const data = {};

    // strings
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    // numbers
    if (req.body.price) data.price = Number(req.body.price);
    if (req.body.deposit) data.deposit = Number(req.body.deposit);
    if (req.body.bedrooms) data.bedrooms = Number(req.body.bedrooms);
    if (req.body.bathrooms) data.bathrooms = Number(req.body.bathrooms);

    const updated = await prisma.property.update({
      where: { id },
      data
    });

    res.json(updated);

  } catch (error) {
    console.error(error);
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