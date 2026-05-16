const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const apiRoutes = require("./routes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Security Middleware
app.use(helmet());

app.use(cors({
  origin: "*",
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

// Health Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API Running"
  });
});

app.use("/api/v1", apiRoutes);
// app.use(errorMiddleware);

module.exports = app;