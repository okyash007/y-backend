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
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://yash.host';

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

// Security headers
app.use((req, res, next) => {
  // Allow requests from HTTPS origins
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Security headers
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  
  // For development - remove in production with proper HTTPS
  if (process.env.NODE_ENV !== 'production') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  
  next();
});

// CORS middleware - Configure for production
const allowedOrigins = [
  FRONTEND_URL,
  'https://yash.host',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // In development, allow any origin
    if (NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

// Fingerprint middleware
app.use(fingerprintMiddleware);

app.get("/fp", (req, res) => {
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
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`🔒 CORS configured for allowed origins`);
});
