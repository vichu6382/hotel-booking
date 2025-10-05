import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/HotelRoutes.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/boookingRouter.js";
import connectCloudinary from "./configs/cloudinary.js";

connectDB();
connectCloudinary()


const app = express();

app.use(cors()); // enable

// middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get("", (req, res) => res.send("API working"));
//api to listen to clerk
app.use("/api/clerk", clerkWebhooks);

app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`server is running ${PORT}`);
});
