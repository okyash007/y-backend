import express, { Application, Request, Response } from "express";
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
import { StandardResponse } from "./types/index.js";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "8080", 10);

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
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
    credentials: true,
  })
);

// Fingerprint middleware
app.use(fingerprintMiddleware);

app.get("/fp", (req: Request, res: Response): void => {
  console.log("User fingerprint:", req.fingerprint?.hash);
  console.log(
    "Fingerprint components:",
    JSON.stringify(req.fingerprint?.components, null, 2)
  );

  
  res.json(req.fingerprint);
});

// Routes
app.use("/", router);

// Health check route
app.get("/health", (_req: Request, res: Response): void => {
  const response: StandardResponse = {
    status: "OK",
    timestamp: new Date().toISOString()
  };
  res.json(response);
});

// Error middleware
app.use(errorMiddleWare);

// Start the server
app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
