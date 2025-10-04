import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors()); // enable

// middleware
app.use(express.json());
app.use(clerkMiddleware());

//api to listen to clerk
app.use("/api/clerk", clerkWebhooks);
app.get("", (req, res) => res.send("API working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
  console.log(`server is running ${PORT}`);
});
