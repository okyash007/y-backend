import express from "express";
import "dotenv/config.js";
import connectDB from "./config/database.js";
import { responseTimeMiddleware } from "./middlewares/response.middleware.js";
import { errorMiddleWare } from "./middlewares/error.middleware.js";
import useragent from "express-useragent";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import router from "./routes/index.js";
import { fingerprintMiddleware } from "./middlewares/fingerprint.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "8080", 10);



// Connect to MongoDB
connectDB();

// Apply response time middleware
app.use(responseTimeMiddleware);

// Middleware to parse JSON bodies
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(useragent.express());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(express.json());

// CORS middleware
app.use(cors());

// Fingerprint middleware
// app.use(fingerprintMiddleware);

// Routes
app.use("/", router);

// Health check route
app.get("/health", (_req, res) => {
  const response = {
    status: "OK",
    timestamp: new Date().toISOString(),
  };
  res.json(response);
});

// Error middleware
app.use(errorMiddleWare);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
