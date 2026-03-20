import cloudinary from "../config/cloudinary.js";
import prisma from "../config/prisma.js";
import streamifier from "streamifier";

export const uploadPropertyImages = async (req, res) => {
    try {
        const { propertyId } = req.params;

        const uploadedImages = [];

        for(const file of req.files){
            const result = await new Promise((resolve,reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "renton_properties"},
                    (error, result) => {
                        if(error){
                            reject(error);
                        } else {     
                            resolve(result);
                        }
                    }
                )
                streamifier.createReadStream(file.buffer).pipe(stream);
            })

            const image = await prisma.propertyImage.create({
                data: {
                    propertyId,
                    imageUrl: result.secure_url
                }
            })

            uploadedImages.push(image);
        }

        res.json(uploadedImages);
    } catch (error) {
        res.status(500).json({ message: "Failed to upload images", error: error.message });
    }
}

export const deletePropertyImage = async (req,res) => {
    try {
        const { imageId } = req.params;

        const image = await prisma.propertyImage.findUnique({
            where: {id: imageId}
        })

        if(!image){
            return res.status(404).json({message: "Image not found!"})
        }

        const urlParts = image.imageUrl.split("/");
        const fileName = urlParts[urlParts.length - 1].split(".")[0];


        await cloudinary.uploader.destroy(`renton_properties/${fileName}`);

        await prisma.propertyImage.delete({
            where: {id: imageId}
        })

        res.json({message: "Image deleted"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}