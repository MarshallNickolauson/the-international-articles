import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const port = process.env.BACKEND_PORT || 5000;

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import userRoutes from "./routes/user.routes.js";
import articleRoutes from "./routes/article.routes.js";
import { protect } from './middleware/auth.middleware.js';

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "/data");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.post("/api/upload/image", protect, upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");

    res.send({
        message: "Image uploaded successfully",
        file: req.file,
    });
});

app.delete("/api/upload/image/:filename", protect, (req, res) => {
    const { filename } = req.params;
    const filePath = path.join("/data", filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            console.error(`Stack Trace: ${err.stack}`);

            return res.status(500).json({ message: "Failed to delete the file.", error: err.message });
        }

        res.json({ message: "File deleted successfully!" });
    });
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
