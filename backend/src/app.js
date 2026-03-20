import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import propertyRoutes from "./routes/property.route.js"
import bookingRoutes from "./routes/booking.route.js"
import reviewRoutes from "./routes/review.route.js"
import favoriteRoutes from "./routes/favorite.route.js"
import chatRoutes from "./routes/chat.route.js"
import uploadRoutes from "./routes/upload.route.js"

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/properties",propertyRoutes)
app.use("/api/bookings",bookingRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/favorites", favoriteRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/upload", uploadRoutes)


export default app;