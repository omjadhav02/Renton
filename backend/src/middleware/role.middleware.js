export const authorizeRoles = (...roles) =>{
    return (req, res, next) =>{
        try {
            const userRole = req.user.role;

            if(!roles.includes(userRole)){
                return res.status(403).json({
                    message: "Access Denied!"
                })
            }

            next();
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

