import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res)=>{
    try {
        const  { name, email, password, role, phone }= req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if(existingUser){
            return res.status(400).json({ message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role,
                phone
            }
               
        })

        res.status(201).json({
            message: "User registered Successfully",
            user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(!user){
            return res.status(401).json({message: "Invalid Credentials"})
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            message: "Login Successful",
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}


export const logout = (req, res)=>{
    res.clearCookie("token",{
        httpOnly: true,
        sameSite: "lax",
    });

    res.json({
        message: "Logged Out Successfully"
    })
}

export const getMe = async (req,res)=>{
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                country: true,                
                postCode: true,
            }
        })

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
    
}

export const updateUser = async(req,res) => {
    try {
        const {name, phone, address, city, country, state, postCode } = req.body;

        if(!name && !phone && !address && !city && !country && !state && !postCode){
            return res.status(400).json({message:"No Content to Update!"})
        }

        const user = await prisma.user.findUnique({
            where: {id: req.user.userId}
        })

        if(!user){
            return res.status(404).json({message:"User not found!"});
        }

        await prisma.user.update({
            where: { id: user.id},
            data: req.body,
        })

        res.json({
            message: "User updated successfully!",
            updatedFields: req.body,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}
